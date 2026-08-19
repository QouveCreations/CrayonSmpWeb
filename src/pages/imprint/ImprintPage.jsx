import React from 'react';
import { ImprintHero } from './components/ImprintHero/ImprintHero';
import { ImprintCard } from './components/ImprintCard/ImprintCard';
import { imprintContentConfig } from '../../config/imprint.content.config';
import { themeConfig } from '../../config/theme.config';

import * as LucideIcons from 'lucide-react';

export function ImprintPage() {
  return (
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: themeConfig.colors.background }}>
      <ImprintHero />
      
      {/* Content Section */}
      <div className="w-full max-w-4xl px-6 md:px-12 lg:px-16 py-16 md:py-24 z-10 relative flex flex-col gap-12 md:gap-16">
        {imprintContentConfig.categories.map((category) => {
          const IconComponent = category.icon ? LucideIcons[category.icon] : null;
          
          return (
            <div key={category.id} className="flex flex-col gap-6 md:gap-8 w-full">
              <div className="flex items-center gap-3 md:gap-4">
                {IconComponent && <IconComponent size={40} color={themeConfig.colors.primary} className="w-8 h-8 md:w-10 md:h-10" />}
                <h2 
                  className="text-3xl md:text-4xl m-0"
                  style={{ 
                    color: themeConfig.colors.primary,
                    fontFamily: '"Minecraft Ten", sans-serif',
                    letterSpacing: '0.05em',
                    lineHeight: 1
                  }}
                >
                  {category.title}
                </h2>
              </div>
              <div className="flex flex-col w-full">
                <ImprintCard content={category.content} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
