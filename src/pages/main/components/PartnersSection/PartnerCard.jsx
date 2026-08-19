import React from 'react';
import { TextLink } from '../../../../components/TextLink/TextLink';

export function PartnerCard({ partner }) {
  return (
    <div className="bg-[#121212]/80 backdrop-blur-md rounded-2xl p-3 sm:p-4 md:p-8 flex flex-col items-center justify-center border-2 border-white/5 w-[calc(50%-0.25rem)] sm:w-[calc(50%-0.5rem)] md:w-[calc(20%-1.6rem)] md:min-w-[200px]">
      {partner.logo ? (
        <img 
          src={partner.logo} 
          alt={`${partner.name} logo`} 
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 object-contain mb-3 md:mb-6 drop-shadow-md rounded-[12px] md:rounded-[16px]"
        />
      ) : (
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 flex items-center justify-center mb-3 md:mb-6 bg-white/5 rounded-[12px] md:rounded-[16px] border border-white/10 shadow-inner">
          <span className="text-xl sm:text-2xl md:text-3xl font-black text-white/50 uppercase tracking-wider text-center px-2 md:px-4" style={{ fontFamily: "'Minecraft Ten', sans-serif" }}>
            {partner.name.charAt(0)}
          </span>
        </div>
      )}
      
      <h3 className="text-sm sm:text-base md:text-2xl text-white mb-1 md:mb-2 text-center tracking-wider break-words w-full" style={{ fontFamily: "'Minecraft Ten', sans-serif" }}>
        {partner.name}
      </h3>
      
      <p className="text-[#B0BAC5] text-center uppercase tracking-widest text-[10px] sm:text-xs md:text-sm font-semibold mb-3 md:mb-8 line-clamp-1 break-all">
        {partner.role}
      </p>
      
      <div className="scale-75 sm:scale-90 md:scale-100 origin-center">
        <TextLink 
          href={partner.url} 
          target="_blank" 
          rel="noopener noreferrer"
          prefixIcon="BookOpen"
          suffixIcon="ExternalLink"
        >
          <span className="hidden sm:inline">Visit site</span>
          <span className="inline sm:hidden">Visit</span>
        </TextLink>
      </div>
    </div>
  );
}
