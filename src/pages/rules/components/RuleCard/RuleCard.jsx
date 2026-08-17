import React from 'react';

import { themeConfig } from '../../../../config/theme.config';

export const RuleCard = ({ title, content, accentColor }) => {
  const color = accentColor === 'primary' ? themeConfig.colors.primary : (accentColor || themeConfig.colors.primary);
  return (
    <div className="bg-[#101013] rounded-xl p-6 md:p-8 flex flex-col h-full border border-white/5 hover:border-white/10 transition-colors shadow-lg">
      <h2 
        className="font-bold text-xl md:text-2xl mb-4" 
        style={{ color: color, fontFamily: '"Minecraft Ten", sans-serif', letterSpacing: '0.05em' }}
      >
        {title}
      </h2>
      <div className="flex flex-col gap-3 flex-grow">
        {content.map((paragraph, index) => (
          <p key={index} className="text-[#B0BAC5] text-sm md:text-base leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};
