import React from 'react';
import { TextLink } from '../../../../components/TextLink/TextLink';

export function PartnerCard({ partner }) {
  return (
    <div className="bg-[#121212]/80 backdrop-blur-md rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center border-2 border-white/5 w-full max-w-sm">
      {partner.logo ? (
        <img 
          src={partner.logo} 
          alt={`${partner.name} logo`} 
          className="w-32 h-32 object-contain mb-6 drop-shadow-md rounded-[16px]"
        />
      ) : (
        <div className="w-32 h-32 flex items-center justify-center mb-6 bg-white/5 rounded-[16px] border border-white/10 shadow-inner">
          <span className="text-3xl font-black text-white/50 uppercase tracking-wider text-center px-4" style={{ fontFamily: "'Minecraft Ten', sans-serif" }}>
            {partner.name.charAt(0)}
          </span>
        </div>
      )}
      
      <h3 className="text-2xl text-white mb-2 text-center tracking-wider" style={{ fontFamily: "'Minecraft Ten', sans-serif" }}>
        {partner.name}
      </h3>
      
      <p className="text-[#B0BAC5] text-center uppercase tracking-widest text-sm font-semibold mb-8">
        {partner.role}
      </p>
      
      <TextLink 
        href={partner.url} 
        target="_blank" 
        rel="noopener noreferrer"
        prefixIcon="BookOpen"
        suffixIcon="ExternalLink"
      >
        Visit site
      </TextLink>
    </div>
  );
}
