import React from 'react';
import { whatIsConfig } from '../../../../config/whatis.config';
import { HelpCircle } from 'lucide-react';
import { SectionTitle } from '../../../../shared/components/SectionTitle';

export function WhatIsSection() {
  return (
    <section className="relative w-full py-12 md:py-24 z-20 flex flex-col items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <SectionTitle 
          title={whatIsConfig.title} 
          icon={HelpCircle} 
          className="mb-6 text-white" 
        />
        
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
