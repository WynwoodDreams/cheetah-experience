/**
 * Maps a normalized scroll progress (0-1) to a video timestamp.
 * @param progress Normalized scroll progress (0 to 1)
 * @param duration Total duration of the video in seconds
 * @param loops Number of times to loop the video over the progress duration
 */
export const getTimestampFromProgress = (progress: number, duration: number, loops: number = 1): number => {
    // If progress is 1, clamp to duration end to avoid wrapping to 0
    if (progress >= 1) return duration;

    // Calculate looped progress
    const loopedProgress = (progress * loops) % 1;
    return Math.min(Math.max(loopedProgress * duration, 0), duration);
};

/**
 * Maps a normalized scroll progress (0-1) to a specific frame index.
 * @param progress Normalized scroll progress (0 to 1)
 * @param totalFrames Total number of frames in the sequence
 */
export const getFrameFromProgress = (progress: number, totalFrames: number): number => {
    const frame = Math.floor(progress * (totalFrames - 1));
    return Math.min(Math.max(frame, 0), totalFrames - 1);
};

/**
 * Maps a value from one range to another.
 */
export const mapRange = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};
