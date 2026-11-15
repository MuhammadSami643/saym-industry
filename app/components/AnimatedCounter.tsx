"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export interface AnimatedCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * AnimatedCounter component that visibly rolls up numbers from 0
 * Triggers when scrolled into view, with configurable delay, duration, and format.
 */
export default function AnimatedCounter({
  value,
  duration = 1.6,
  delay = 0.2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
  style,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let animationFrameId: number;

    timeoutId = setTimeout(() => {
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / (duration * 1000);
        const progress = Math.min(elapsed, 1);

        // Smooth cubic ease-out: visibly counts up smoothly
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = ease * value;

        setDisplayValue(current);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, value, duration, delay]);

  const formatted = decimals > 0
    ? displayValue.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : Math.floor(displayValue).toLocaleString();

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: 'inline-block',
        fontVariantNumeric: 'tabular-nums',
        ...style,
      }}
    >
      {prefix}{formatted}{suffix}
    </span>
  );
}

