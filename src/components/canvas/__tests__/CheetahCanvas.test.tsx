import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { CheetahCanvas } from '../CheetahCanvas';
import * as ScrollProviderModule from '@/components/core/ScrollProvider';

// Mock the ScrollProvider hook
vi.mock('@/components/core/ScrollProvider', () => ({
    useScrollProgress: vi.fn(() => ({ progress: 0, scrollY: 0 })),
}));

// Mock canvas context
const mockCanvasContext = {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    drawImage: vi.fn(),
    createLinearGradient: vi.fn(() => ({
        addColorStop: vi.fn(),
    })),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    fillText: vi.fn(),
    fillStyle: '',
    font: '',
};

describe('CheetahCanvas', () => {
    let resizeListeners: Array<(e: Event) => void> = [];

    beforeEach(() => {
        resizeListeners = [];

        // Mock getContext
        HTMLCanvasElement.prototype.getContext = vi.fn(() => mockCanvasContext) as unknown as typeof HTMLCanvasElement.prototype.getContext;

        // Mock window dimensions
        Object.defineProperty(window, 'innerWidth', { value: 1920, writable: true });
        Object.defineProperty(window, 'innerHeight', { value: 1080, writable: true });

        // Capture resize listeners
        vi.spyOn(window, 'addEventListener').mockImplementation((event, handler) => {
            if (event === 'resize') {
                resizeListeners.push(handler as (e: Event) => void);
            }
        });
        vi.spyOn(window, 'removeEventListener').mockImplementation(() => {});

        // Reset mocks
        vi.mocked(ScrollProviderModule.useScrollProgress).mockReturnValue({ progress: 0, scrollY: 0 });
        Object.values(mockCanvasContext).forEach(mock => {
            if (typeof mock === 'function' && 'mockClear' in mock) {
                mock.mockClear();
            }
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should render a canvas element', () => {
        render(<CheetahCanvas />);
        const canvas = document.querySelector('canvas');
        expect(canvas).toBeInTheDocument();
    });

    it('should have correct CSS classes for fixed positioning', () => {
        render(<CheetahCanvas />);
        const canvas = document.querySelector('canvas');
        expect(canvas).toHaveClass('fixed', 'top-0', 'left-0', 'w-full', 'h-full');
    });

    it('should set canvas dimensions to window size on mount', async () => {
        render(<CheetahCanvas />);
        const canvas = document.querySelector('canvas') as HTMLCanvasElement;

        await waitFor(() => {
            expect(canvas.width).toBe(1920);
            expect(canvas.height).toBe(1080);
        });
    });

    it('should update canvas dimensions on window resize', async () => {
        render(<CheetahCanvas />);
        const canvas = document.querySelector('canvas') as HTMLCanvasElement;

        // Change window size
        Object.defineProperty(window, 'innerWidth', { value: 1280, writable: true });
        Object.defineProperty(window, 'innerHeight', { value: 720, writable: true });

        act(() => {
            resizeListeners.forEach(listener => listener(new Event('resize')));
        });

        await waitFor(() => {
            expect(canvas.width).toBe(1280);
            expect(canvas.height).toBe(720);
        });
    });

    it('should render placeholder when no video source provided', async () => {
        render(<CheetahCanvas />);

        // Should use canvas context to draw
        await waitFor(() => {
            expect(mockCanvasContext.clearRect).toHaveBeenCalled();
            expect(mockCanvasContext.createLinearGradient).toHaveBeenCalled();
            expect(mockCanvasContext.fillRect).toHaveBeenCalled();
        });
    });

    it('should update rendering based on scroll progress', async () => {
        const { rerender } = render(<CheetahCanvas />);

        // Update scroll progress
        vi.mocked(ScrollProviderModule.useScrollProgress).mockReturnValue({ progress: 0.5, scrollY: 500 });
        rerender(<CheetahCanvas />);

        await waitFor(() => {
            expect(mockCanvasContext.clearRect).toHaveBeenCalled();
        });
    });

    it('should clean up animation frame on unmount', async () => {
        const cancelSpy = vi.spyOn(global, 'cancelAnimationFrame');
        const { unmount } = render(<CheetahCanvas />);

        unmount();

        expect(cancelSpy).toHaveBeenCalled();
    });

    it('should clean up resize listener on unmount', () => {
        const { unmount } = render(<CheetahCanvas />);

        unmount();

        expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    });

    describe('with video source', () => {
        let mockVideo: Partial<HTMLVideoElement>;
        let originalCreateElement: typeof document.createElement;

        beforeEach(() => {
            mockVideo = {
                src: '',
                muted: false,
                playsInline: false,
                preload: '',
                duration: 10,
                currentTime: 0,
                videoWidth: 1920,
                videoHeight: 1080,
                onloadedmetadata: null,
            };

            originalCreateElement = document.createElement.bind(document);
            vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
                if (tagName === 'video') {
                    return mockVideo as HTMLVideoElement;
                }
                return originalCreateElement(tagName);
            });
        });

        it('should create video element when videoSrc is provided', () => {
            render(<CheetahCanvas videoSrc="/test-video.mp4" />);

            expect(document.createElement).toHaveBeenCalledWith('video');
            expect(mockVideo.src).toBe('/test-video.mp4');
            expect(mockVideo.muted).toBe(true);
            expect(mockVideo.playsInline).toBe(true);
        });

        it('should set video to ready state when metadata loads', async () => {
            render(<CheetahCanvas videoSrc="/test-video.mp4" />);

            // Trigger the loadedmetadata callback
            act(() => {
                if (mockVideo.onloadedmetadata) {
                    mockVideo.onloadedmetadata(new Event('loadedmetadata') as Event);
                }
            });

            // After video is ready, drawImage should be called
            await waitFor(() => {
                expect(mockCanvasContext.drawImage).toHaveBeenCalled();
            });
        });

        it('should sync video currentTime with scroll progress', async () => {
            vi.mocked(ScrollProviderModule.useScrollProgress).mockReturnValue({ progress: 0.5, scrollY: 500 });
            render(<CheetahCanvas videoSrc="/test-video.mp4" loopCount={1} />);

            // Trigger video ready
            act(() => {
                if (mockVideo.onloadedmetadata) {
                    mockVideo.onloadedmetadata(new Event('loadedmetadata') as Event);
                }
            });

            await waitFor(() => {
                // At 0.5 progress with 10s duration, should seek to 5s
                expect(mockVideo.currentTime).toBe(5);
            });
        });
    });

    describe('loopCount prop', () => {
        it('should default loopCount to 1', () => {
            render(<CheetahCanvas />);
            // Component renders without error with default loopCount
            expect(document.querySelector('canvas')).toBeInTheDocument();
        });

        it('should accept custom loopCount', () => {
            render(<CheetahCanvas loopCount={3} />);
            expect(document.querySelector('canvas')).toBeInTheDocument();
        });
    });
});
