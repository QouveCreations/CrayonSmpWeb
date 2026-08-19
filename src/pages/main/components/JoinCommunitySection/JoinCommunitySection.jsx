import React from 'react';
import { joinCommunityConfig } from '../../../../config/joincommunity.config';
import { Users } from 'lucide-react';
import { DiscordIcon } from '../../../../components/icons/DiscordIcon';
import { themeConfig } from '../../../../config/theme.config';
import { QooperMascot } from './QooperMascot';
import { useIsMobile } from '../../../../shared/utils/deviceDetect';
import { SectionTitle } from '../../../../shared/components/SectionTitle';

export function JoinCommunitySection() {
  const isMobile = useIsMobile();

  return (
    <section className="relative w-full py-12 md:pt-40 md:pb-24 z-20 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Mascot - absolutely positioned to bleed off the right edge */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-[30%] md:-right-[15%] lg:-right-[5%] w-[80vw] md:w-[60vw] lg:w-[45vw] max-w-[800px] aspect-square pointer-events-none opacity-30 md:opacity-100 z-0">
        {!isMobile && <QooperMascot />}
      </div>

      <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
        {/* Title */}
        <SectionTitle 
          title={joinCommunityConfig.title} 
          icon={Users} 
          className="mb-20 text-white" 
        />
        
        {/* CTA Button */}
        <a 
          href={joinCommunityConfig.discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-8 py-4 mb-20 rounded-full text-white text-xl md:text-2xl shadow-lg border border-white/10"
          style={{ backgroundColor: themeConfig.colors.primary, fontFamily: "'Minecraft Ten', sans-serif", letterSpacing: '0.05em' }}
        >
          <DiscordIcon size={32} color="#FFFFFF" />
          <span className="-mt-[3px]">{joinCommunityConfig.buttonLabel}</span>
        </a>

        {/* Description */}
        <p className="text-lg md:text-xl text-center text-[#B0BAC5] max-w-2xl mb-0 md:mb-12">
          {joinCommunityConfig.description}
        </p>
      </div>
    </section>
  );
}
