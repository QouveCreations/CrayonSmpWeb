import React from 'react';
import { whatIsConfig } from '../../../../config/whatis.config';
import { HelpCircle } from 'lucide-react';

export function WhatIsSection() {
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
          <HelpCircle className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white" style={{ filter: 'drop-shadow(0px 4px 0px rgba(0,0,0,0.5))' }} />
          <span>{whatIsConfig.title}</span>
        </h2>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-center text-[#B0BAC5] max-w-2xl mb-12">
          {whatIsConfig.description}
        </p>

        {/* Image */}
        <div className="w-full max-w-6xl mx-auto flex justify-center">
          <img 
            src={whatIsConfig.image} 
            alt="What is CrayonSMP" 
            className="w-full h-auto object-cover rounded-2xl md:rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.6)] border-[4px] border-white/5"
          />
        </div>
      </div>
    </section>
  );
}
