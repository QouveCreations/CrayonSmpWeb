import React, { forwardRef } from 'react';
import { themeConfig } from '../../config/theme.config';

export const NavPill = forwardRef(({ item, isActive, onClick }, ref) => {
  const Icon = item.icon;
  return (
    <div
      ref={ref}
      onClick={onClick}
      className="relative px-6 py-2 cursor-pointer transition-colors duration-300 z-20 flex items-center justify-center gap-2"
      style={{
        color: isActive ? themeConfig.colors.primary : themeConfig.colors.text
      }}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="relative z-20 font-semibold tracking-wide text-lg">
        {item.label}
      </span>
    </div>
  );
});

