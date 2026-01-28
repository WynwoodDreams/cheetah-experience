'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScrollProgress } from '@/components/core/ScrollProvider';
import { getTimestampFromProgress } from '@/lib/TimelineUtils';

interface CheetahCanvasProps {
    videoSrc?: string;
    frameCount?: number; // If using image sequence (future proofing)
    loopCount?: number;
    fadeOutStart?: number; // Progress value (0-1) when fade begins
    fadeOutEnd?: number;   // Progress value (0-1) when fully faded to black
}

export const CheetahCanvas: React.FC<CheetahCanvasProps> = ({
    videoSrc,
    loopCount = 1,
    fadeOutStart = 0.15,  // Start fading at 15% scroll (after ~1.5 screens)
    fadeOutEnd = 0.20     // Fully black at 20% scroll (after 2 screens)
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const { progress } = useScrollProgress();
    const [isVideoReady, setIsVideoReady] = useState(false);
    const requestRef = useRef<number | null>(null);

    // Calculate opacity based on progress (1 = visible, 0 = black)
    const getVideoOpacity = (prog: number): number => {
        if (prog <= fadeOutStart) return 1;
        if (prog >= fadeOutEnd) return 0;
        return 1 - (prog - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    };

    // Initialize Video
    useEffect(() => {
        console.log("CheetahCanvas Mounted. VideoSrc:", videoSrc);
        if (!videoSrc) return;

        const video = document.createElement('video');
        video.src = videoSrc;
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';

        // Attempt to load
        video.onloadedmetadata = () => {
            setIsVideoReady(true);
            // Determine initial draw
            draw();
        };

        videoRef.current = video;

        return () => {
            video.src = '';
            videoRef.current = null;
        };
    }, [videoSrc]);

    // Main Draw Loop
    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (!canvas || !ctx) return;

        const opacity = getVideoOpacity(progress);

        // Always fill with black first (this becomes the background when video fades)
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // If fully faded out, no need to draw video
        if (opacity <= 0) return;

        // Set global alpha for fade effect
        ctx.globalAlpha = opacity;

        if (isVideoReady && videoRef.current) {
            // Video Logic
            const video = videoRef.current;
            if (video.duration) {
                const targetTime = getTimestampFromProgress(progress, video.duration, loopCount);
                // Smooth seek (optional: lerp for smoother visual, but direct map is tighter control)
                if (isFinite(targetTime)) {
                    video.currentTime = targetTime;
                }
            }

            // Draw video (cover logic)
            // Pass explicit dimensions to avoid type errors with CanvasImageSource
            renderCover(ctx, video, canvas.width, canvas.height, video.videoWidth, video.videoHeight);
        } else {
            // Placeholder Logic (Procedural Animation)
            renderPlaceholder(ctx, canvas.width, canvas.height, progress);
        }

        // Reset global alpha
        ctx.globalAlpha = 1;
    };

    // Helper: Contain/Cover logic for Canvas
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
        const centerShift_x = (canvasWidth - sWidth * ratio) / 2;
        const centerShift_y = (canvasHeight - sHeight * ratio) / 2;

        ctx.drawImage(
            source,
            0, 0, sWidth, sHeight,
            centerShift_x, centerShift_y, sWidth * ratio, sHeight * ratio
        );
    };

    // Placeholder Helper
    const renderPlaceholder = (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        prog: number
    ) => {
        // Dynamic background
        const hue = Math.floor(prog * 360);

        // Create Gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#02040A');
        gradient.addColorStop(1, `hsl(${hue}, 50%, 20%)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Draw "Cheetah" Box
        const boxSize = 100;
        const xPath = width * 0.8; // travel 80% of screen

        const x = (width * 0.1) + (xPath * prog); // Move left to right
        const y = height / 2;

        ctx.fillStyle = '#D9A036';
        ctx.save();
        ctx.translate(x, y);
        // Rotate slightly based on speed/progress
        ctx.rotate(Math.sin(prog * 20) * 0.1);
        ctx.fillRect(-boxSize / 2, -boxSize / 2, boxSize, boxSize);

        // Speed lines
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        for (let i = 0; i < 3; i++) {
            ctx.fillRect(-boxSize - (i * 40), -10, 30, 2);
        }

        ctx.restore();

        // Debug Text
        ctx.fillStyle = 'white';
        ctx.font = '20px sans-serif';
        ctx.fillText(`Progress: ${prog.toFixed(3)}`, 20, 40);
        ctx.fillText(isVideoReady ? "Video Active" : "Placeholder Mode", 20, 70);
    };

    // Update loop
    // We use useEffect to trigger draws when progress changes
    useEffect(() => {
        // For video, we might need a slight delay or persistent loop to catch the frame update
        // after seeking. `requestAnimationFrame` loop is safer for video sync.
        const animate = () => {
            draw();
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [progress, isVideoReady]); // Re-bind if dependencies change, though ref is better.

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                draw(); // Force redraw
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
        />
    );
};
