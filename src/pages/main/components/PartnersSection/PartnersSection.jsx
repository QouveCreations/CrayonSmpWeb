import React from 'react';
import { partnersConfig } from '../../../../config/partners.config';
import { Handshake } from 'lucide-react';
import { PartnerCard } from './PartnerCard';
import { SectionTitle } from '../../../../shared/components/SectionTitle';

export function PartnersSection() {
  return (
    <section className="relative w-full py-12 md:py-24 z-20 flex flex-col items-center justify-center overflow-hidden bg-black/20">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <SectionTitle 
          title={partnersConfig.title} 
          icon={Handshake} 
          className="mb-6 text-white" 
        />
        
        {/* Description */}
        <p className="text-lg md:text-xl text-center text-[#B0BAC5] max-w-2xl mb-16">
          {partnersConfig.description}
        </p>

        {/* Partners Grid */}
        <div className="w-full flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8">
          {partnersConfig.partners.map((partner, index) => (
            <PartnerCard key={index} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
