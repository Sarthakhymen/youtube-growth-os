import React from 'react';
import styles from './Button.module.css';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, fullWidth, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          styles.button, 
          styles[variant], 
          styles[size], 
          fullWidth && styles.fullWidth,
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? <span className={styles.loader}></span> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
