import { describe, it, expect } from 'vitest';
import { getTimestampFromProgress, getFrameFromProgress, mapRange } from '../TimelineUtils';

describe('TimelineUtils', () => {
    describe('getTimestampFromProgress', () => {
        const duration = 10; // 10 second video

        it('should return 0 when progress is 0', () => {
            expect(getTimestampFromProgress(0, duration)).toBe(0);
        });

        it('should return duration when progress is 1', () => {
            expect(getTimestampFromProgress(1, duration)).toBe(duration);
        });

        it('should return half duration when progress is 0.5', () => {
            expect(getTimestampFromProgress(0.5, duration)).toBe(5);
        });

        it('should clamp negative progress to 0', () => {
            expect(getTimestampFromProgress(-0.1, duration)).toBe(0);
        });

        it('should return duration when progress exceeds 1', () => {
            expect(getTimestampFromProgress(1.5, duration)).toBe(duration);
        });

        describe('with looping', () => {
            it('should loop through the video twice when loops=2', () => {
                // At progress 0.25 with 2 loops, we should be at half of the first loop
                expect(getTimestampFromProgress(0.25, duration, 2)).toBe(5);
            });

            it('should complete first loop at progress 0.5 with loops=2', () => {
                // At progress 0.5 with 2 loops, the looped progress wraps to 0
                expect(getTimestampFromProgress(0.5, duration, 2)).toBe(0);
            });

            it('should be at middle of second loop at progress 0.75 with loops=2', () => {
                expect(getTimestampFromProgress(0.75, duration, 2)).toBe(5);
            });

            it('should return duration when progress is 1 regardless of loops', () => {
                expect(getTimestampFromProgress(1, duration, 3)).toBe(duration);
            });
        });

        describe('edge cases', () => {
            it('should handle zero duration', () => {
                expect(getTimestampFromProgress(0.5, 0)).toBe(0);
            });

            it('should handle very small progress values', () => {
                expect(getTimestampFromProgress(0.001, duration)).toBeCloseTo(0.01, 5);
            });

            it('should handle progress very close to 1', () => {
                expect(getTimestampFromProgress(0.999, duration)).toBeCloseTo(9.99, 2);
            });
        });
    });

    describe('getFrameFromProgress', () => {
        const totalFrames = 100;

        it('should return 0 when progress is 0', () => {
            expect(getFrameFromProgress(0, totalFrames)).toBe(0);
        });

        it('should return last frame when progress is 1', () => {
            expect(getFrameFromProgress(1, totalFrames)).toBe(99);
        });

        it('should return approximately middle frame at progress 0.5', () => {
            expect(getFrameFromProgress(0.5, totalFrames)).toBe(49);
        });

        it('should clamp negative progress to frame 0', () => {
            expect(getFrameFromProgress(-0.5, totalFrames)).toBe(0);
        });

        it('should clamp progress > 1 to last frame', () => {
            expect(getFrameFromProgress(1.5, totalFrames)).toBe(99);
        });

        describe('edge cases', () => {
            it('should handle single frame', () => {
                expect(getFrameFromProgress(0.5, 1)).toBe(0);
            });

            it('should handle two frames', () => {
                expect(getFrameFromProgress(0, 2)).toBe(0);
                expect(getFrameFromProgress(0.5, 2)).toBe(0);
                expect(getFrameFromProgress(1, 2)).toBe(1);
            });

            it('should return integer frame indices', () => {
                const frame = getFrameFromProgress(0.333, totalFrames);
                expect(Number.isInteger(frame)).toBe(true);
            });
        });
    });

    describe('mapRange', () => {
        it('should map value from one range to another', () => {
            expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
        });

        it('should handle mapping to same range', () => {
            expect(mapRange(5, 0, 10, 0, 10)).toBe(5);
        });

        it('should handle inverted output range', () => {
            expect(mapRange(0, 0, 10, 100, 0)).toBe(100);
            expect(mapRange(10, 0, 10, 100, 0)).toBe(0);
        });

        it('should handle negative ranges', () => {
            expect(mapRange(0, -10, 10, 0, 100)).toBe(50);
        });

        it('should handle values outside input range', () => {
            // Values outside range are extrapolated
            expect(mapRange(15, 0, 10, 0, 100)).toBe(150);
            expect(mapRange(-5, 0, 10, 0, 100)).toBe(-50);
        });

        it('should handle floating point values', () => {
            expect(mapRange(2.5, 0, 10, 0, 100)).toBe(25);
        });

        describe('edge cases', () => {
            it('should handle very small ranges', () => {
                expect(mapRange(0.5, 0, 1, 0, 1000)).toBe(500);
            });

            it('should handle zero input range (division by zero)', () => {
                // This will result in Infinity or NaN
                const result = mapRange(5, 5, 5, 0, 100);
                expect(!isFinite(result)).toBe(true);
            });
        });
    });
});
