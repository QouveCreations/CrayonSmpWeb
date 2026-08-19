import React from 'react';
import { footerConfig } from '../../config/footer.config';
import { TextLink } from '../../components/TextLink/TextLink';

export const SiteFooter = () => {
  const activeColumns = footerConfig.columns.filter(col => col.enabled);

  return (
    <footer className="pt-16 pb-40 px-6 mt-auto w-full">
      <div 
        className="max-w-screen-xl mx-auto flex flex-wrap justify-center"
        style={{ gap: footerConfig.columnGap }}
      >
        {activeColumns.map(column => (
          <div key={column.id} className="flex flex-col gap-6 min-w-[150px]">
            <h3 className="text-white font-bold text-xl">
              {column.title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {column.items.map((item, idx) => {
                const itemStyle = {
                  '--normal-color': item.color || '#B0BAC5',
                  '--hover-color': item.hoverColor || '#FFFFFF',
                };
                
                return (
                  <li key={idx}>
                    {item.url ? (
                      <TextLink 
                        href={item.url} 
                        className="text-lg transition-colors duration-200 text-[var(--normal-color)] hover:text-[var(--hover-color)]"
                        style={itemStyle}
                        target={item.externalIcon ? "_blank" : undefined}
                        rel={item.externalIcon ? "noopener noreferrer" : undefined}
                        suffixIcon={item.externalIcon ? "ExternalLink" : undefined}
                      >
                        {item.text}
                      </TextLink>
                    ) : (
                      <span 
                        className="text-lg transition-colors duration-200 cursor-default text-[var(--normal-color)] hover:text-[var(--hover-color)]" 
                        style={itemStyle}
                      >
                        {item.text}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};
