import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OverlaySections } from '../OverlaySections';

vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion');
    return {
        ...actual,
        motion: {
            div: ({ children, initial, animate, whileInView, exit, transition, viewport, ...props }: React.ComponentProps<'div'> & Record<string, unknown>) => (
                <div {...props}>{children}</div>
            ),
            span: ({ children, ...props }: React.ComponentProps<'span'> & Record<string, unknown>) => {
                const { animate: _a, transition: _t, ...rest } = props;
                return <span {...rest}>{children}</span>;
            },
        },
    };
});

describe('OverlaySections', () => {
    it('should render the main element', () => {
        render(<OverlaySections />);
        expect(document.querySelector('main')).toBeInTheDocument();
    });

    describe('Hero Section', () => {
        it('should render cybersecurity heading', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Threat Response')).toBeInTheDocument();
            expect(screen.getByText('at Cheetah Speed')).toBeInTheDocument();
        });

        it('should render the tagline', () => {
            render(<OverlaySections />);
            expect(screen.getByText(/AI-powered security operations/i)).toBeInTheDocument();
        });

        it('should display scroll instruction', () => {
            render(<OverlaySections />);
            expect(screen.getByText('SCROLL')).toBeInTheDocument();
        });

        it('should have CTA links', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Start Free Audit')).toBeInTheDocument();
            expect(screen.getByText('See How It Works')).toBeInTheDocument();
        });
    });

    describe('Speed Section', () => {
        it('should display detection speed messaging', () => {
            render(<OverlaySections />);
            expect(screen.getAllByText('Mean Time to Detect').length).toBeGreaterThan(0);
        });
    });

    describe('Security Metrics Section', () => {
        it('should display threat detection rate', () => {
            render(<OverlaySections />);
            expect(screen.getByText('99.97%')).toBeInTheDocument();
            expect(screen.getByText('Threat Detection Rate')).toBeInTheDocument();
        });

        it('should display MTTD stat card', () => {
            render(<OverlaySections />);
            expect(screen.getAllByText('<200ms').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Mean Time to Detect').length).toBeGreaterThan(0);
        });

        it('should display events analyzed', () => {
            render(<OverlaySections />);
            expect(screen.getByText('4.2B+')).toBeInTheDocument();
            expect(screen.getByText('Events Analyzed Daily')).toBeInTheDocument();
        });

        it('should display breaches stat', () => {
            render(<OverlaySections />);
            expect(screen.getByText('0')).toBeInTheDocument();
            expect(screen.getByText('Breaches on Our Watch')).toBeInTheDocument();
        });
    });

    describe('Solutions Section', () => {
        it('should display Protection heading', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Protection at Every Layer')).toBeInTheDocument();
        });

        it('should display security feature cards', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Threat Intelligence')).toBeInTheDocument();
            expect(screen.getByText('Zero-Trust Access')).toBeInTheDocument();
            expect(screen.getByText('24/7 SOC Monitoring')).toBeInTheDocument();
            expect(screen.getByText('Network Detection')).toBeInTheDocument();
            expect(screen.getByText('Automated Response')).toBeInTheDocument();
            expect(screen.getByText('Pen Testing as a Service')).toBeInTheDocument();
        });
    });

    describe('Pricing Section', () => {
        it('should display pricing heading', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Security for Every Stage')).toBeInTheDocument();
        });

        it('should display pricing tiers', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Recon')).toBeInTheDocument();
            expect(screen.getByText('Hunter')).toBeInTheDocument();
            expect(screen.getByText('Apex Predator')).toBeInTheDocument();
        });

        it('should have pricing values', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Free')).toBeInTheDocument();
            expect(screen.getByText(/\$499/)).toBeInTheDocument();
            expect(screen.getByText('Custom')).toBeInTheDocument();
        });

        it('should have recommended badge on Hunter tier', () => {
            render(<OverlaySections />);
            expect(screen.getByText('RECOMMENDED')).toBeInTheDocument();
        });
    });

    describe('CTA Section', () => {
        it('should display call to action', () => {
            render(<OverlaySections />);
            expect(screen.getByText(/Don't Wait for the Breach/)).toBeInTheDocument();
        });

        it('should have audit and demo buttons', () => {
            render(<OverlaySections />);
            const auditButtons = screen.getAllByRole('button', { name: /start free security audit/i });
            expect(auditButtons.length).toBeGreaterThan(0);
            expect(screen.getByRole('button', { name: /schedule demo/i })).toBeInTheDocument();
        });
    });

    describe('Footer', () => {
        it('should have footer navigation sections', () => {
            render(<OverlaySections />);
            expect(screen.getByText('Platform')).toBeInTheDocument();
            expect(screen.getByText('Company')).toBeInTheDocument();
            expect(screen.getByText('Resources')).toBeInTheDocument();
            expect(screen.getByText('Legal')).toBeInTheDocument();
        });

        it('should have copyright notice', () => {
            render(<OverlaySections />);
            expect(screen.getByText(/© 2026 CheetahSec/)).toBeInTheDocument();
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
            const goldElements = document.querySelectorAll('[class*="text-cheetah-gold"]');
            expect(goldElements.length).toBeGreaterThan(0);
        });

        it('should have white title text', () => {
            render(<OverlaySections />);
            const title = screen.getByText('Threat Response');
            expect(title.closest('h1')).toHaveClass('text-white');
        });
    });
});
