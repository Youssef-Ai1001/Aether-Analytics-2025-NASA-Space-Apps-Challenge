import React, { ButtonHTMLAttributes } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  className?: string;
  children: React.ReactNode;
}
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  glow = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background-dark disabled:opacity-50 disabled:pointer-events-none';
  const variantStyles = {
    primary: 'bg-gradient-to-r from-neon-cyan to-neon-green text-background-dark hover:brightness-110',
    secondary: 'bg-background-light/30 text-text-primary hover:bg-background-light/50',
    outline: 'border border-text-secondary text-text-primary bg-transparent hover:bg-background-light/20',
    ghost: 'bg-transparent text-text-primary hover:bg-background-light/20'
  };
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-md',
    md: 'text-sm px-4 py-2 rounded-md',
    lg: 'text-base px-6 py-3 rounded-md'
  };
  const glowStyles = glow ? 'shadow-neon-glow hover:shadow-neon-glow-intense' : '';
  return <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${glowStyles} ${className}`} {...props}>
      {children}
    </button>;
};