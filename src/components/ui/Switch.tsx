import React, { InputHTMLAttributes } from 'react';

type Accent = 'red' | 'orange' | 'cyan' | 'green';

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  accent?: Accent;
}

const accentClasses: Record<Accent, string> = {
  red: 'bg-alert-red shadow-[0_0_12px_rgba(244,67,54,0.6)]',
  orange: 'bg-alert-orange shadow-[0_0_12px_rgba(255,152,0,0.6)]',
  cyan: 'bg-neon-cyan shadow-[0_0_12px_rgba(0,230,255,0.6)]',
  green: 'bg-neon-green shadow-[0_0_12px_rgba(20,255,158,0.6)]'
};

export const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange, accent = 'cyan', className = '', disabled, ...props }) => {
  return <label className={`relative inline-flex items-center cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <input
        {...props}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={e => onCheckedChange?.(e.target.checked)}
        disabled={disabled}
      />
      <span className={`w-12 h-6 rounded-full transition-colors duration-300 ${checked ? 'bg-background-light/40' : 'bg-background-light/20'}`}></span>
      <span className={`absolute left-0 top-0 h-6 w-6 rounded-full transform transition-transform duration-300 ${checked ? 'translate-x-6' : ''} ${checked ? accentClasses[accent] : 'bg-text-secondary'} ring-1 ring-white/10`}></span>
    </label>;
};

export default Switch;

