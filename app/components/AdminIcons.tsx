import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ArrowRightIcon({ size = 14, className = '', style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        ...style,
      }}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function ExternalLinkIcon({ size = 13, className = '', style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        ...style,
      }}
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 13, className = '', style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        ...style,
      }}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.08 7.37C8.91 7.37 8.64 7.44 8.41 7.68C8.18 7.93 7.52 8.55 7.52 9.82C7.52 11.09 8.44 12.31 8.57 12.49C8.7 12.66 10.39 15.28 12.98 16.39C15.13 17.32 15.57 17.13 16.03 17.09C16.5 17.05 17.52 16.49 17.73 15.9C17.94 15.31 17.94 14.81 17.87 14.7C17.81 14.59 17.64 14.53 17.38 14.4C17.13 14.28 15.9 13.67 15.67 13.59C15.44 13.5 15.28 13.46 15.11 13.71C14.94 13.96 14.47 14.53 14.32 14.7C14.18 14.87 14.03 14.89 13.78 14.77C13.52 14.64 12.7 14.37 11.73 13.51C10.97 12.83 10.46 12 10.31 11.75C10.16 11.5 10.3 11.36 10.42 11.23C10.54 11.12 10.68 10.94 10.81 10.79C10.94 10.64 10.98 10.53 11.07 10.36C11.15 10.19 11.11 10.05 11.05 9.92C10.98 9.8 10.52 8.66 10.33 8.2C10.14 7.75 9.95 7.82 9.8 7.81C9.66 7.8 9.5 7.8 9.33 7.8C9.16 7.8 8.89 7.86 8.66 8.11L9.08 7.37Z" />
    </svg>
  );
}
