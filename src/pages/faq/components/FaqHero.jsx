import React from 'react';
import { themeConfig } from '../../../config/theme.config';
import { faqConfig } from '../../../config/faq.config';
import { RulesGrid } from '../../rules/components/RulesGrid/RulesGrid';

export const FaqHero = ({ children }) => {
  return (
    <div className="relative w-full h-[40vh] min-h-[340px] overflow-hidden flex flex-col items-center justify-center">
      {/* Background Gradient/Blur */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${themeConfig.colors.primary} 0%, transparent 60%)`,
          opacity: 0.5,
          filter: 'blur(60px)'
        }}
      />

      {/* Lightweight CSS Grid Plane (shared with the Rules hero) */}
      <RulesGrid />

      {/* Headline */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6 w-full pointer-events-none">
        <h1
          className="text-white m-0 p-0 leading-none drop-shadow-md text-center"
          style={{
            fontFamily: '"Minecraft Ten", sans-serif',
            fontSize: 'clamp(5rem, 12vw, 10rem)',
            letterSpacing: '0.05em'
          }}
        >
          FAQ
        </h1>

        {/* Optional slot below the headline (used for the search) */}
        {children && (
          <div className="pointer-events-auto mt-6 w-full max-w-md">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};