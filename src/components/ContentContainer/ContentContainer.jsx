import React from 'react';
import { themeConfig } from '../../config/theme.config';

export const ContentContainer = ({ children }) => {
  return (
    <div 
      className="w-full min-h-screen relative z-30 flex justify-center pt-24"
      style={{ backgroundColor: themeConfig.colors.surface, color: themeConfig.colors.text }}
    >
      <div className="max-w-5xl w-full px-8">
        {children}
      </div>
    </div>
  );
};
