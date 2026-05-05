import React from 'react';
import styles from './Card.module.css';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outline';
}

export const Card = ({ className, variant = 'default', ...props }: CardProps) => {
  return <div className={cn(styles.card, styles[variant], className)} {...props} />;
};
