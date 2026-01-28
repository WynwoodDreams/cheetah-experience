import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, renderHook } from '@testing-library/react';
import { ScrollProvider, useScrollProgress } from '../ScrollProvider';

// Helper component to test the hook
const TestConsumer = () => {
    const { progress, scrollY } = useScrollProgress();
    return (
        <div>
            <span data-testid="progress">{progress}</span>
            <span data-testid="scrollY">{scrollY}</span>
        </div>
    );
};

describe('ScrollProvider', () => {
    let scrollEventListeners: Array<(e: Event) => void> = [];
    let resizeEventListeners: Array<(e: Event) => void> = [];

    beforeEach(() => {
        scrollEventListeners = [];
        resizeEventListeners = [];

        // Mock window properties
        Object.defineProperty(window, 'scrollY', {
            writable: true,
            value: 0,
        });
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            value: 1000,
        });
        Object.defineProperty(document.documentElement, 'scrollHeight', {
            writable: true,
            configurable: true,
            value: 3000,
        });

        // Capture event listeners
        vi.spyOn(window, 'addEventListener').mockImplementation((event, handler) => {
            if (event === 'scroll') {
                scrollEventListeners.push(handler as (e: Event) => void);
            } else if (event === 'resize') {
                resizeEventListeners.push(handler as (e: Event) => void);
            }
        });
        vi.spyOn(window, 'removeEventListener').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should render children', () => {
        render(
            <ScrollProvider>
                <div data-testid="child">Test Child</div>
            </ScrollProvider>
        );
        expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should provide initial context values of 0', () => {
        render(
            <ScrollProvider>
                <TestConsumer />
            </ScrollProvider>
        );
        expect(screen.getByTestId('progress').textContent).toBe('0');
        expect(screen.getByTestId('scrollY').textContent).toBe('0');
    });

    it('should register scroll and resize event listeners', () => {
        render(
            <ScrollProvider>
                <TestConsumer />
            </ScrollProvider>
        );
        expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
        expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    });

    it('should update progress on scroll', () => {
        render(
            <ScrollProvider>
                <TestConsumer />
            </ScrollProvider>
        );

        // Simulate scrolling to middle of page
        Object.defineProperty(window, 'scrollY', { value: 1000, writable: true });

        act(() => {
            scrollEventListeners.forEach(listener => listener(new Event('scroll')));
        });

        // maxScroll = 3000 - 1000 = 2000, progress = 1000 / 2000 = 0.5
        expect(screen.getByTestId('progress').textContent).toBe('0.5');
        expect(screen.getByTestId('scrollY').textContent).toBe('1000');
    });

    it('should clamp progress between 0 and 1', () => {
        render(
            <ScrollProvider>
                <TestConsumer />
            </ScrollProvider>
        );

        // Scroll beyond max
        Object.defineProperty(window, 'scrollY', { value: 5000, writable: true });

        act(() => {
            scrollEventListeners.forEach(listener => listener(new Event('scroll')));
        });

        expect(screen.getByTestId('progress').textContent).toBe('1');
    });

    it('should handle resize events', () => {
        render(
            <ScrollProvider>
                <TestConsumer />
            </ScrollProvider>
        );

        // Change window size and scroll position
        Object.defineProperty(window, 'innerHeight', { value: 500, writable: true });
        Object.defineProperty(window, 'scrollY', { value: 1250, writable: true });

        act(() => {
            resizeEventListeners.forEach(listener => listener(new Event('resize')));
        });

        // maxScroll = 3000 - 500 = 2500, progress = 1250 / 2500 = 0.5
        expect(screen.getByTestId('progress').textContent).toBe('0.5');
    });

    it('should handle zero max scroll (page fits in viewport)', () => {
        Object.defineProperty(document.documentElement, 'scrollHeight', {
            value: 1000,
            writable: true,
            configurable: true,
        });

        render(
            <ScrollProvider>
                <TestConsumer />
            </ScrollProvider>
        );

        // When page fits in viewport, progress should be 0
        expect(screen.getByTestId('progress').textContent).toBe('0');
    });

    it('should clean up event listeners on unmount', () => {
        const { unmount } = render(
            <ScrollProvider>
                <TestConsumer />
            </ScrollProvider>
        );

        unmount();

        expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
        expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    });
});

describe('useScrollProgress', () => {
    it('should return default values when used outside provider', () => {
        const { result } = renderHook(() => useScrollProgress());
        expect(result.current.progress).toBe(0);
        expect(result.current.scrollY).toBe(0);
    });
});
