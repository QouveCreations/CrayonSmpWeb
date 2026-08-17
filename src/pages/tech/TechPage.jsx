import React from 'react';
import { TechHero } from './components/TechHero/TechHero';
import { PluginCard } from './components/PluginCard/PluginCard';
import { techPluginsConfig } from '../../config/tech.plugins.config';
import { themeConfig } from '../../config/theme.config';

export function TechPage() {
  return (
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: themeConfig.colors.background }}>
      <TechHero />
      
      {/* Content Section */}
      <div className="w-full max-w-6xl px-6 md:px-12 lg:px-16 py-16 md:py-24 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {techPluginsConfig.map((plugin, index) => (
            <PluginCard 
              key={index}
              plugin={plugin}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
