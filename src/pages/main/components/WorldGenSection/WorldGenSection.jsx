import React from 'react';
import { worldGenConfig } from '../../../../config/worldgen.config';
import { WorldGenCarousel } from '../WorldGenCarousel/WorldGenCarousel';

export function WorldGenSection() {
  return (
    <section className="relative w-full py-24 z-20 flex flex-col items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl text-center text-white mb-6 uppercase tracking-wider"
          style={{ 
            fontFamily: "'Minecraft Ten', sans-serif",
            textShadow: '0px 4px 0px rgba(0,0,0,0.5)'
          }}
        >
          {worldGenConfig.title}
        </h2>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-center text-[#B0BAC5] max-w-2xl mb-12">
          {worldGenConfig.description}
        </p>
      </div>

      {/* Carousel */}
      <WorldGenCarousel images={worldGenConfig.images} />
    </section>
  );
}
