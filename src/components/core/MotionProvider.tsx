'use client';

import React from 'react';
import { MotionConfig } from 'framer-motion';

/** Honors the visitor's "reduce motion" OS setting for every animation below it. */
export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
