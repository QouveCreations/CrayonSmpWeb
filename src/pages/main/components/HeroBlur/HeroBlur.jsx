import React from 'react';
import { themeConfig } from '../../../../config/theme.config';
import { heroConfig } from '../../../../config/hero.config';

export const HeroBlur = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Background Gradient/Blur */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${themeConfig.colors.radialBlur} 0%, transparent 60%)`,
          opacity: 0.5,
          filter: 'blur(60px)'
        }}
      />
      
      {/* 3D Scene Container */}
      <div className="absolute inset-0 z-10">
        {children}
      </div>

      {/* Two-Line Headline overlay with difference blend mode for automatic inversion */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center"
        style={{ mixBlendMode: heroConfig.headline.blendMode }}
      >
        <div 
          className="flex flex-col items-center justify-center" 
          style={{ fontFamily: heroConfig.headline.fontFamily }}
        >
          <h2 
            className="leading-none m-0 p-0"
            style={{ 
              color: heroConfig.headline.line1.color,
              fontSize: heroConfig.headline.line1.size,
              letterSpacing: heroConfig.headline.line1.letterSpacing,
              transform: `translate(${heroConfig.headline.line1.offsetX || 0}px, ${heroConfig.headline.line1.offsetY || 0}px)`,
              marginBottom: '-0.1em' // Tightly spaced above the main title
            }}
          >
            {heroConfig.headline.line1.text}
          </h2>
          <h1 
            className="leading-none m-0 p-0"
            style={{ 
              color: heroConfig.headline.line2.color,
              fontSize: heroConfig.headline.line2.size,
              letterSpacing: heroConfig.headline.line2.letterSpacing,
              transform: `translate(${heroConfig.headline.line2.offsetX || 0}px, ${heroConfig.headline.line2.offsetY || 0}px)`
            }}
          >
            {heroConfig.headline.line2.text}
          </h1>
        </div>
      </div>

    </div>
  );
};
