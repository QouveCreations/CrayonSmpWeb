import React from 'react';
import { worldGenConfig } from '../../../../config/worldgen.config';
import { WorldGenCarousel } from '../WorldGenCarousel/WorldGenCarousel';
import { Globe } from 'lucide-react';

export function WorldGenSection() {
  return (
    <section className="relative w-full py-24 z-20 flex flex-col items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl text-center text-white mb-6 uppercase tracking-wider flex items-center justify-center gap-4 md:gap-6"
          style={{ 
            fontFamily: "'Minecraft Ten', sans-serif",
            textShadow: '0px 4px 0px rgba(0,0,0,0.5)'
          }}
        >
          <Globe className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white" style={{ filter: 'drop-shadow(0px 4px 0px rgba(0,0,0,0.5))' }} />
          <span>{worldGenConfig.title}</span>
        </h2>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-center text-[#B0BAC5] max-w-2xl mb-12">
          {worldGenConfig.description}
        </p>
      </div>

      {/* Carousel */}
      <WorldGenCarousel 
        images={worldGenConfig.images} 
        autoplayIntervalMs={worldGenConfig.autoplayIntervalMs} 
      />
    </section>
  );
}
