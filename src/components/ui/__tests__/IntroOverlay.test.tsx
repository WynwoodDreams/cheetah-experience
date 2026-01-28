import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntroOverlay } from '../IntroOverlay';

// Mock framer-motion to avoid animation timing issues in tests
vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion');
    return {
        ...actual,
        AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
        motion: {
            div: ({ children, exit, initial, animate, whileInView, ...props }: React.ComponentProps<'div'> & Record<string, unknown>) => (
                <div {...props}>{children}</div>
            ),
        },
    };
});

describe('IntroOverlay', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render the intro overlay initially', () => {
        render(<IntroOverlay />);
        expect(screen.getByText('Hunt')).toBeInTheDocument();
        expect(screen.getByText('The Pursuit Begins')).toBeInTheDocument();
    });

    it('should render the enter experience button', () => {
        render(<IntroOverlay />);
        expect(screen.getByRole('button', { name: /enter experience/i })).toBeInTheDocument();
    });

    it('should render a background video element', () => {
        render(<IntroOverlay />);
        const video = document.querySelector('video') as HTMLVideoElement;
        expect(video).toBeInTheDocument();
        expect(video).toHaveAttribute('src', '/sequence/cheetah_run.mp4');
        expect(video).toHaveAttribute('autoplay');
        expect(video).toHaveAttribute('loop');
        // In React, the muted property is set directly on the element, not as an attribute
        expect(video.muted).toBe(true);
    });

    it('should hide overlay when enter button is clicked', async () => {
        const user = userEvent.setup();
        render(<IntroOverlay />);

        const button = screen.getByRole('button', { name: /enter experience/i });
        await user.click(button);

        // After clicking, the overlay should be hidden (isVisible = false)
        await waitFor(() => {
            expect(screen.queryByText('Hunt')).not.toBeInTheDocument();
        });
    });

    it('should have proper z-index for overlay positioning', () => {
        render(<IntroOverlay />);
        const overlay = screen.getByText('Hunt').closest('[class*="z-50"]');
        expect(overlay).toBeInTheDocument();
    });

    it('should have centered content layout', () => {
        render(<IntroOverlay />);
        const container = screen.getByText('Hunt').closest('[class*="flex"]');
        expect(container).toHaveClass('items-center', 'justify-center');
    });

    describe('styling', () => {
        it('should have full screen fixed positioning', () => {
            render(<IntroOverlay />);
            const overlay = screen.getByText('Hunt').closest('[class*="fixed"]');
            expect(overlay).toHaveClass('inset-0');
        });

        it('should have black background', () => {
            render(<IntroOverlay />);
            const overlay = screen.getByText('Hunt').closest('[class*="bg-black"]');
            expect(overlay).toBeInTheDocument();
        });

        it('should have grayscale filter on video', () => {
            render(<IntroOverlay />);
            const video = document.querySelector('video');
            expect(video).toHaveClass('grayscale');
        });
    });

    describe('button interactions', () => {
        it('should have hover styles on the button', () => {
            render(<IntroOverlay />);
            const button = screen.getByRole('button', { name: /enter experience/i });
            expect(button).toHaveClass('hover:border-cheetah-gold');
        });

        it('should be focusable', () => {
            render(<IntroOverlay />);
            const button = screen.getByRole('button', { name: /enter experience/i });
            button.focus();
            expect(button).toHaveFocus();
        });
    });
});
