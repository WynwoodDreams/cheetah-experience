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
        it('should render the company name "Cheetah Computing"', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Cheetah')).toBeInTheDocument();
            expect(screen.getByText('Computing')).toBeInTheDocument();
        });

        it('should render the tagline', () => {
            render(<OverlaySections />);
            expect(screen.getByText(/lightning-fast infrastructure/i)).toBeInTheDocument();
        });

        it('should display scroll instruction', () => {
            render(<OverlaySections />);
            expect(screen.getByText('SCROLL TO EXPLORE')).toBeInTheDocument();
        });

        it('should have Get Started and Learn More buttons', () => {
            render(<OverlaySections />);
            // Multiple "Get Started" buttons exist, so use getAllByRole
            const getStartedButtons = screen.getAllByRole('button', { name: /get started/i });
            expect(getStartedButtons.length).toBeGreaterThan(0);
            expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument();
        });
    });

    describe('Speed Section', () => {
        it('should display speed messaging', () => {
            render(<OverlaySections />);
            expect(screen.getByText(/speed that/i)).toBeInTheDocument();
        });
    });

    describe('Performance Metrics Section', () => {
        it('should display uptime statistic', () => {
            render(<OverlaySections />);
            expect(screen.getByText('99.99%')).toBeInTheDocument();
            expect(screen.getByText('Uptime SLA')).toBeInTheDocument();
        });

        it('should display latency statistic', () => {
            render(<OverlaySections />);
            expect(screen.getByText('<10ms')).toBeInTheDocument();
            expect(screen.getByText('Global Latency')).toBeInTheDocument();
        });

        it('should display bandwidth statistic', () => {
            render(<OverlaySections />);
            expect(screen.getByText('10 TB/s')).toBeInTheDocument();
            expect(screen.getByText('Bandwidth')).toBeInTheDocument();
        });

        it('should display API requests statistic', () => {
            render(<OverlaySections />);
            expect(screen.getByText('2M+')).toBeInTheDocument();
            expect(screen.getByText('API Requests/sec')).toBeInTheDocument();
        });
    });

    describe('Features Section', () => {
        it('should display Why Choose Cheetah heading', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Why Choose Cheetah')).toBeInTheDocument();
        });

        it('should display feature cards', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Instant Deployment')).toBeInTheDocument();
            expect(screen.getByText('Enterprise Security')).toBeInTheDocument();
            expect(screen.getByText('Real-time Analytics')).toBeInTheDocument();
            expect(screen.getByText('Global CDN')).toBeInTheDocument();
            expect(screen.getByText('Auto-scaling')).toBeInTheDocument();
            expect(screen.getByText('Developer Tools')).toBeInTheDocument();
        });
    });

    describe('Pricing Section', () => {
        it('should display pricing heading', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Simple, Transparent Pricing')).toBeInTheDocument();
        });

        it('should display pricing tiers', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Starter')).toBeInTheDocument();
            expect(screen.getByText('Pro')).toBeInTheDocument();
            expect(screen.getByText('Enterprise')).toBeInTheDocument();
        });

        it('should have pricing values', () => {
            render(<OverlaySections />);
            expect(screen.getByText(/\$0/)).toBeInTheDocument();
            expect(screen.getByText(/\$99/)).toBeInTheDocument();
            expect(screen.getByText('Custom')).toBeInTheDocument();
        });

        it('should have popular badge on Pro tier', () => {
            render(<OverlaySections />);
            expect(screen.getByText('POPULAR')).toBeInTheDocument();
        });
    });

    describe('Testimonials Section', () => {
        it('should display testimonials heading', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Trusted by Industry Leaders')).toBeInTheDocument();
        });

        it('should display testimonial quotes', () => {
            render(<OverlaySections />);
            expect(screen.getByText(/reduced our deployment time by 80%/i)).toBeInTheDocument();
            expect(screen.getByText(/auto-scaling capabilities/i)).toBeInTheDocument();
        });

        it('should display testimonial authors', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Jane Doe')).toBeInTheDocument();
            expect(screen.getByText('Mike Smith')).toBeInTheDocument();
        });
    });

    describe('CTA Section', () => {
        it('should display call to action', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Ready to Move Fast?')).toBeInTheDocument();
        });

        it('should have trial and demo buttons', () => {
            render(<OverlaySections />);
            // Multiple "Start Free Trial" buttons exist, so use getAllByRole
            const trialButtons = screen.getAllByRole('button', { name: /start free trial/i });
            expect(trialButtons.length).toBeGreaterThan(0);
            expect(screen.getByRole('button', { name: /schedule demo/i })).toBeInTheDocument();
        });
    });

    describe('Footer', () => {
        it('should have footer navigation sections', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Product')).toBeInTheDocument();
            expect(screen.getByText('Company')).toBeInTheDocument();
            expect(screen.getByText('Resources')).toBeInTheDocument();
            expect(screen.getByText('Legal')).toBeInTheDocument();
        });

        it('should have copyright notice', () => {
            render(<OverlaySections />);
            expect(screen.getByText(/© 2026 Cheetah Computing/)).toBeInTheDocument();
        });

        it('should have social links', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Twitter')).toBeInTheDocument();
            expect(screen.getByText('GitHub')).toBeInTheDocument();
            expect(screen.getByText('LinkedIn')).toBeInTheDocument();
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

        it('should have black background section wrapper', () => {
            render(<OverlaySections />);
            const blackBgSection = document.querySelector('.bg-black');
            expect(blackBgSection).toBeInTheDocument();
        });
    });

    describe('Styling', () => {
        it('should have gold colored elements', () => {
            render(<OverlaySections />);
            const goldElements = document.querySelectorAll('.text-cheetah-gold');
            expect(goldElements.length).toBeGreaterThan(0);
        });

        it('should have white title text', () => {
            render(<OverlaySections />);
            const title = screen.getByText('Cheetah');
            expect(title.closest('h1')).toHaveClass('text-white');
        });
    });
});
