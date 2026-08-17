import React from 'react';
import * as LucideIcons from 'lucide-react';
import { themeConfig } from '../../../../config/theme.config';
import { TextLink } from '../../../../components/TextLink/TextLink';
import { GithubIcon } from '../../../../components/icons/GithubIcon';

export const PluginCard = ({ plugin }) => {
  const { name, icon, description, docsUrl } = plugin;
  const IconComponent = icon === 'Github' ? GithubIcon : (LucideIcons[icon] || LucideIcons.HelpCircle);

  return (
    <div className="bg-[#101013] rounded-xl p-6 md:p-8 flex flex-col h-full border border-white/5 hover:border-white/10 transition-colors shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-lg bg-white/5 text-[#FF0040]">
          <IconComponent size={24} color={themeConfig.colors.primary} />
        </div>
        <h2 
          className="text-[#FF0040] font-bold text-xl md:text-2xl" 
          style={{ fontFamily: '"Minecraft Ten", sans-serif', letterSpacing: '0.05em' }}
        >
          {name}
        </h2>
      </div>
      
      <p className="text-[#B0BAC5] text-sm md:text-base leading-relaxed flex-grow mb-6">
        {description}
      </p>

      <div className="mt-auto flex flex-col gap-3 items-start">
        {plugin.links?.map((link, idx) => (
          <TextLink 
            key={idx}
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            prefixIcon={link.prefixIcon}
            suffixIcon={link.suffixIcon}
          >
            {link.label}
          </TextLink>
        ))}
      </div>
    </div>
  );
};
