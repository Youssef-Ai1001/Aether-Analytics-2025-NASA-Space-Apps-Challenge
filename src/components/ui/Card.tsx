import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glassmorphism?: boolean;
}
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  glassmorphism = false
}) => {
  const baseStyles = 'rounded-xl overflow-hidden';
  const hoverStyles = hoverable ? 'transition-all duration-300 hover:shadow-neon-glow hover:-translate-y-1' : '';
  const glassStyles = glassmorphism ? 'bg-background-dark/70 backdrop-blur-md' : 'bg-background-light/10';
  return <div className={`${baseStyles} ${hoverStyles} ${glassStyles} ${className}`}>
      {children}
    </div>;
};