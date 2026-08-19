import React from 'react';
import { RulesHero } from './components/RulesHero/RulesHero';
import { RuleCard } from './components/RuleCard/RuleCard';
import { rulesContentConfig } from '../../config/rules.content.config';
import { themeConfig } from '../../config/theme.config';
import { SectionTitle } from '../../shared/components/SectionTitle';

import * as LucideIcons from 'lucide-react';

export function RulesPage() {
  return (
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: themeConfig.colors.background }}>
      <RulesHero />
      
      {/* Content Section */}
      <div className="w-full max-w-6xl px-6 md:px-12 lg:px-16 py-16 md:py-24 z-10 relative flex flex-col gap-16 md:gap-24">
        {rulesContentConfig.categories.map((category) => {
          const IconComponent = category.icon ? LucideIcons[category.icon] : null;
          const iconColor = category.accentColor === 'primary' ? themeConfig.colors.primary : category.accentColor;
          
          return (
            <div key={category.id} className="flex flex-col gap-8 md:gap-12 w-full">
              <SectionTitle 
                title={category.title} 
                icon={IconComponent} 
                iconColor={iconColor} 
                className="mb-0" 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {category.rules.map((rule, index) => (
                  <RuleCard 
                    key={index}
                    title={rule.title}
                    content={rule.content}
                    accentColor={category.accentColor}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
