import React from 'react';
import { worldGenConfig } from '../../../../config/worldgen.config';
import { WorldGenCarousel } from '../WorldGenCarousel/WorldGenCarousel';
import { Globe } from 'lucide-react';
import { SectionTitle } from '../../../../shared/components/SectionTitle';

export function WorldGenSection() {
  return (
    <section className="relative w-full py-12 md:py-24 z-20 flex flex-col items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <SectionTitle 
          title={worldGenConfig.title} 
          icon={Globe} 
          className="mb-6 text-white" 
        />
        
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
