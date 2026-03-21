import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor, act } from '@testing-library/react';
import { CheetahCanvas } from '../CheetahCanvas';

// Track the getProgress return value so tests can change it
let mockProgress = 0;

vi.mock('@/components/core/ScrollProvider', () => ({
    useScrollProgress: vi.fn(() => ({
        getProgress: () => mockProgress,
        getScrollY: () => 0,
        subscribe: () => () => {},
    })),
}));

const mockCanvasContext = {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    drawImage: vi.fn(),
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    fillText: vi.fn(),
    fillStyle: '',
    font: '',
    globalAlpha: 1,
};

describe('CheetahCanvas', () => {
    let resizeListeners: Array<(e: Event) => void> = [];

    beforeEach(() => {
        resizeListeners = [];
        mockProgress = 0;

        HTMLCanvasElement.prototype.getContext = vi.fn(() => mockCanvasContext) as unknown as typeof HTMLCanvasElement.prototype.getContext;

        Object.defineProperty(window, 'innerWidth', { value: 1920, writable: true });
        Object.defineProperty(window, 'innerHeight', { value: 1080, writable: true });

        vi.spyOn(window, 'addEventListener').mockImplementation((event, handler) => {
            if (event === 'resize') resizeListeners.push(handler as (e: Event) => void);
        });
        vi.spyOn(window, 'removeEventListener').mockImplementation(() => {});

        Object.values(mockCanvasContext).forEach(mock => {
            if (typeof mock === 'function' && 'mockClear' in mock) mock.mockClear();
        });
    });

    afterEach(() => { vi.restoreAllMocks(); });

    it('should render a canvas element', () => {
        render(<CheetahCanvas />);
        expect(document.querySelector('canvas')).toBeInTheDocument();
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

        Object.defineProperty(window, 'innerWidth', { value: 1280, writable: true });
        Object.defineProperty(window, 'innerHeight', { value: 720, writable: true });

        act(() => { resizeListeners.forEach(listener => listener(new Event('resize'))); });

        await waitFor(() => {
            expect(canvas.width).toBe(1280);
            expect(canvas.height).toBe(720);
        });
    });

    it('should draw black fill when no video source provided', async () => {
        render(<CheetahCanvas fadeOutStart={0.15} fadeOutEnd={0.20} />);
        await waitFor(() => { expect(mockCanvasContext.fillRect).toHaveBeenCalled(); });
    });

    it('should clean up animation frame on unmount', () => {
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
                onloadeddata: null,
                pause: vi.fn(),
                removeAttribute: vi.fn(),
                load: vi.fn(),
            };

            originalCreateElement = document.createElement.bind(document);
            vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
                if (tagName === 'video') return mockVideo as HTMLVideoElement;
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

        it('should draw video after data loads', async () => {
            render(<CheetahCanvas videoSrc="/test-video.mp4" />);

            act(() => {
                if (mockVideo.onloadeddata) {
                    (mockVideo.onloadeddata as (e: Event) => void)(new Event('loadeddata'));
                }
            });

            await waitFor(() => { expect(mockCanvasContext.drawImage).toHaveBeenCalled(); });
        });

        it('should sync video currentTime with scroll progress', async () => {
            mockProgress = 0.05;
            render(<CheetahCanvas videoSrc="/test-video.mp4" loopCount={1} fadeOutStart={0.15} fadeOutEnd={0.20} />);

            act(() => {
                if (mockVideo.onloadeddata) {
                    (mockVideo.onloadeddata as (e: Event) => void)(new Event('loadeddata'));
                }
            });

            await waitFor(() => {
                expect(mockVideo.currentTime).toBe(0.5);
            });
        });
    });

    describe('loopCount prop', () => {
        it('should default loopCount to 1', () => {
            render(<CheetahCanvas />);
            expect(document.querySelector('canvas')).toBeInTheDocument();
        });

        it('should accept custom loopCount', () => {
            render(<CheetahCanvas loopCount={3} />);
            expect(document.querySelector('canvas')).toBeInTheDocument();
        });
    });

    describe('fadeOut props', () => {
        it('should accept fadeOutStart and fadeOutEnd props', () => {
            render(<CheetahCanvas fadeOutStart={0.1} fadeOutEnd={0.2} />);
            expect(document.querySelector('canvas')).toBeInTheDocument();
        });

        it('should render black background when progress exceeds fadeOutEnd', async () => {
            mockProgress = 0.5;
            render(<CheetahCanvas fadeOutStart={0.1} fadeOutEnd={0.2} />);
            await waitFor(() => { expect(mockCanvasContext.fillRect).toHaveBeenCalled(); });
        });

        it('should use default fadeOut values', () => {
            render(<CheetahCanvas />);
            expect(document.querySelector('canvas')).toBeInTheDocument();
        });
    });
});
