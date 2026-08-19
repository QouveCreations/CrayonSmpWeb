import React from 'react';
import { themeConfig } from '../../../../config/theme.config';
import { RulesGrid } from '../RulesGrid/RulesGrid';
import { QooperMascot } from '../QooperMascot/QooperMascot';
import { useIsMobile } from '../../../../shared/utils/deviceDetect';

export const RulesHero = () => {
  const isMobile = useIsMobile();

  return (
    <div className="relative w-full h-[40vh] min-h-[300px] overflow-hidden flex flex-col items-center justify-center">
      {/* Background Gradient/Blur */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${themeConfig.colors.primary} 0%, transparent 60%)`,
          opacity: 0.5,
          filter: 'blur(60px)'
        }}
      />

      {/* Lightweight CSS Grid Plane */}
      <RulesGrid />

      {/* Headline */}
      <div className="relative z-20 flex flex-col items-center justify-center pointer-events-none">
        <h1 
          className="text-white m-0 p-0 leading-none drop-shadow-md text-center"
          style={{ 
            fontFamily: '"Minecraft Ten", sans-serif',
            fontSize: 'clamp(5rem, 12vw, 10rem)',
            letterSpacing: '0.05em'
          }}
        >
          RULES
        </h1>
      </div>

      {/* Qooper Mascot Slot */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[2%] md:right-[10%] h-[80%] aspect-square z-30 pointer-events-none">
        {!isMobile && <QooperMascot />}
      </div>
    </div>
  );
};
