import React from 'react';
import { themeConfig } from '../../../../config/theme.config';
import { heroConfig } from '../../../../config/hero.config';
import { useIsMobile } from '../../../../shared/utils/deviceDetect';

export const HeroBlur = ({ children }) => {
  const isMobile = useIsMobile();
  const heroHeight = isMobile && heroConfig.mobile?.heroHeight ? heroConfig.mobile.heroHeight : '100vh';
  const paddingTop = isMobile && heroConfig.mobile?.headlineOffsetTop ? heroConfig.mobile.headlineOffsetTop : '15vh';
  const transformX = isMobile && heroConfig.mobile?.headlineOffsetX ? `translateX(${heroConfig.mobile.headlineOffsetX})` : 'none';

  return (
    <div 
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ height: heroHeight }}
    >
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

      {/* Content overlay */}
      <div 
        className={`absolute top-0 left-0 w-full h-full z-20 pointer-events-none flex flex-col items-center ${isMobile ? 'justify-center' : 'justify-start'}`}
        style={{ 
          paddingTop: isMobile ? 0 : paddingTop,
          transform: transformX
        }}
      >
        <div 
          className="flex flex-col items-center justify-center" 
          style={{ 
            fontFamily: heroConfig.headline.fontFamily,
            mixBlendMode: heroConfig.headline.blendMode
          }}
        >
          <h2 
            className="leading-none m-0 p-0 text-center"
            style={{ 
              color: heroConfig.headline.line1.color,
              fontSize: heroConfig.headline.line1.size,
              letterSpacing: heroConfig.headline.line1.letterSpacing,
              marginBottom: '-0.1em' // Tightly spaced above the main title
            }}
          >
            {heroConfig.headline.line1.text}
          </h2>
          <h1 
            className="leading-none m-0 p-0 text-center"
            style={{ 
              color: heroConfig.headline.line2.color,
              fontSize: heroConfig.headline.line2.size,
              letterSpacing: heroConfig.headline.line2.letterSpacing
            }}
          >
            {heroConfig.headline.line2.text}
          </h1>
        </div>

        {/* Mobile Brush Image */}
        {isMobile && heroConfig.mobile?.brushImage && (
          <div className="mt-12 px-4 flex justify-center w-full pointer-events-auto">
            <img 
              src={heroConfig.mobile.brushImage.path} 
              alt="CrayonSMP Brush" 
              className="drop-shadow-lg"
              style={{ maxHeight: heroConfig.mobile.brushImage.maxHeight, objectFit: 'contain' }}
            />
          </div>
        )}
      </div>

    </div>
  );
};
