'use client';

import React, { useEffect, useRef } from 'react';
import { useScrollProgress } from '@/components/core/ScrollProvider';
import { getTimestampFromProgress } from '@/lib/TimelineUtils';

interface CheetahCanvasProps {
    videoSrc?: string;
    loopCount?: number;
    fadeOutStart?: number;
    fadeOutEnd?: number;
}

export const CheetahCanvas: React.FC<CheetahCanvasProps> = ({
    videoSrc,
    loopCount = 1,
    fadeOutStart = 0.15,
    fadeOutEnd = 0.20
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const isVideoReadyRef = useRef(false);
    const rafRef = useRef<number | null>(null);
    const { getProgress } = useScrollProgress();

    // Opacity calculation (pure function, no state dependency)
    const getVideoOpacity = (prog: number): number => {
        if (prog <= fadeOutStart) return 1;
        if (prog >= fadeOutEnd) return 0;
        return 1 - (prog - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    };

    // Cover-fit rendering helper
    const renderCover = (
        ctx: CanvasRenderingContext2D,
        source: CanvasImageSource,
        canvasWidth: number,
        canvasHeight: number,
        sWidth: number,
        sHeight: number
    ) => {
        if (!sWidth || !sHeight) return;
        const ratio = Math.max(canvasWidth / sWidth, canvasHeight / sHeight);
        const cx = (canvasWidth - sWidth * ratio) / 2;
        const cy = (canvasHeight - sHeight * ratio) / 2;
        ctx.drawImage(source, 0, 0, sWidth, sHeight, cx, cy, sWidth * ratio, sHeight * ratio);
    };

    useEffect(() => {
        if (!videoSrc) return;

        const video = document.createElement('video');
        video.src = videoSrc;
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.onloadeddata = () => {
            isVideoReadyRef.current = true;
        };
        videoRef.current = video;

        return () => {
            video.pause();
            video.removeAttribute('src');
            video.load();
            videoRef.current = null;
            isVideoReadyRef.current = false;
        };
    }, [videoSrc]);

    // Single persistent rAF loop — reads progress from ref, never recreated
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Size canvas to window
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        let lastSeekTime = -1;

        const draw = () => {
            const progress = getProgress();
            const opacity = getVideoOpacity(progress);

            // Black fill base
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (opacity > 0 && isVideoReadyRef.current && videoRef.current) {
                const video = videoRef.current;
                if (video.duration) {
                    const targetTime = getTimestampFromProgress(progress, video.duration, loopCount);
                    // Only seek if time actually changed (avoids redundant seeks)
                    if (isFinite(targetTime) && Math.abs(targetTime - lastSeekTime) > 0.03) {
                        video.currentTime = targetTime;
                        lastSeekTime = targetTime;
                    }
                }
                ctx.globalAlpha = opacity;
                renderCover(ctx, video, canvas.width, canvas.height, video.videoWidth, video.videoHeight);
                ctx.globalAlpha = 1;
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [getProgress, loopCount, fadeOutStart, fadeOutEnd]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
        />
    );
};
