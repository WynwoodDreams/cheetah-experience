import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OverlaySections } from '../OverlaySections';

// Mock framer-motion to avoid animation timing issues in tests
vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion');
    return {
        ...actual,
        motion: {
            div: ({ children, initial, animate, whileInView, exit, transition, viewport, ...props }: React.ComponentProps<'div'> & Record<string, unknown>) => (
                <div {...props}>{children}</div>
            ),
        },
    };
});

describe('OverlaySections', () => {
    it('should render the main element', () => {
        render(<OverlaySections />);
        const main = document.querySelector('main');
        expect(main).toBeInTheDocument();
    });

    describe('Hero Section', () => {
        it('should render the main title "Acinonyx"', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Acinonyx')).toBeInTheDocument();
        });

        it('should render the subtitle', () => {
            render(<OverlaySections />);
            expect(screen.getByText('The Ultimate Sprinter')).toBeInTheDocument();
        });

        it('should display scroll instruction', () => {
            render(<OverlaySections />);
            expect(screen.getByText('SCROLL TO HUNT')).toBeInTheDocument();
        });
    });

    describe('Speed Section', () => {
        it('should display speed statistic', () => {
            render(<OverlaySections />);
            expect(screen.getByText('70 MPH')).toBeInTheDocument();
        });

        it('should include speed description', () => {
            render(<OverlaySections />);
            expect(screen.getByText(/accelerating from 0 to 60 mph/i)).toBeInTheDocument();
        });
    });

    describe('Anatomy Section', () => {
        it('should display anatomy heading', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Aerodynamic Frame')).toBeInTheDocument();
        });

        it('should include anatomy description', () => {
            render(<OverlaySections />);
            expect(screen.getByText(/semi-retractable claws/i)).toBeInTheDocument();
        });
    });

    describe('Habitat Section', () => {
        it('should display habitat heading', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Savannah Ghost')).toBeInTheDocument();
        });

        it('should include habitat description', () => {
            render(<OverlaySections />);
            expect(screen.getByText(/camouflaged against the tall grass/i)).toBeInTheDocument();
        });
    });

    describe('Footer Section', () => {
        it('should display conservation message', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Protect the Speed')).toBeInTheDocument();
        });

        it('should have a conservation button', () => {
            render(<OverlaySections />);
            expect(screen.getByRole('button', { name: /learn conservation/i })).toBeInTheDocument();
        });
    });

    describe('Structure and Layout', () => {
        it('should render multiple sections', () => {
            render(<OverlaySections />);
            const sections = document.querySelectorAll('section');
            expect(sections.length).toBeGreaterThanOrEqual(4);
        });

        it('should have z-index for overlay positioning', () => {
            render(<OverlaySections />);
            const main = document.querySelector('main');
            expect(main).toHaveClass('z-10');
        });

        it('should have full width layout', () => {
            render(<OverlaySections />);
            const main = document.querySelector('main');
            expect(main).toHaveClass('w-full');
        });

        it('should have sections with full viewport height', () => {
            render(<OverlaySections />);
            const sections = document.querySelectorAll('section');
            const fullHeightSections = Array.from(sections).filter(
                section => section.classList.contains('h-screen') || section.classList.contains('h-[50vh]')
            );
            expect(fullHeightSections.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('Styling', () => {
        it('should have gold colored headings', () => {
            render(<OverlaySections />);
            const goldHeadings = document.querySelectorAll('.text-cheetah-gold');
            expect(goldHeadings.length).toBeGreaterThan(0);
        });

        it('should have white title text', () => {
            render(<OverlaySections />);
            const title = screen.getByText('Acinonyx');
            expect(title).toHaveClass('text-white');
        });
    });
});
