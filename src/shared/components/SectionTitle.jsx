import React from 'react';
import { useIsMobile } from '../utils/deviceDetect';
import * as LucideIcons from 'lucide-react';
import { themeConfig } from '../../config/theme.config';

export function SectionTitle({ title, icon, iconColor, style, className = "" }) {
  const isMobile = useIsMobile();
  const IconComponent = icon ? (typeof icon === 'string' ? LucideIcons[icon] : icon) : null;
  const color = iconColor || themeConfig.colors.text;

  return (
    <div 
      className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-center gap-4 md:gap-6 ${className}`}
    >
      {IconComponent && (
        <IconComponent 
          size={isMobile ? 40 : 48} 
          color={color} 
          className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16" 
          style={{ filter: 'drop-shadow(0px 4px 0px rgba(0,0,0,0.5))' }}
        />
      )}
      <h2 
        className="text-4xl md:text-5xl lg:text-6xl text-center m-0 uppercase tracking-wider"
        style={{ 
          fontFamily: "'Minecraft Ten', sans-serif",
          textShadow: '0px 4px 0px rgba(0,0,0,0.5)',
          color: color,
          lineHeight: 1.1,
          ...style
        }}
      >
        {title}
      </h2>
    </div>
  );
}
