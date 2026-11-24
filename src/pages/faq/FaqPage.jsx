import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { faqConfig } from '../../config/faq.config';
import { themeConfig } from '../../config/theme.config';
import { SectionTitle } from '../../shared/components/SectionTitle';
import { DiscordIcon } from '../../components/icons/DiscordIcon';
import { FaqHero } from './components/FaqHero';
import { FaqItem } from './components/FaqItem';

const resolveAccent = (accentColor) =>
  accentColor === 'primary' || !accentColor ? themeConfig.colors.primary : accentColor;

export function FaqPage() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const handleJump = (event, categoryId) => {
    event.preventDefault();
    document.getElementById(categoryId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{ backgroundColor: themeConfig.colors.background }}
    >
      <FaqHero />

      <div className="w-full max-w-4xl px-6 md:px-12 py-12 md:py-20 z-10 relative flex flex-col gap-14 md:gap-20">
        {/* Categories */}
        {faqConfig.categories.map((category) => {
          const Icon = category.icon ? LucideIcons[category.icon] : null;
          const accent = resolveAccent(category.accentColor);

          return (
            <section
              key={category.id}
              id={category.id}
              className="flex flex-col gap-8 md:gap-10 w-full scroll-mt-28"
            >
              <SectionTitle title={category.title} icon={Icon} iconColor={accent} className="mb-0" />

              <div className="flex flex-col gap-3 md:gap-4">
                {category.items.map((item) => {
                  const itemId = `${category.id}-${item.question}`;
                  return (
                    <FaqItem
                      key={itemId}
                      id={itemId.replace(/[^a-zA-Z0-9]+/g, '-')}
                      item={item}
                      accentColor={category.accentColor}
                      isOpen={openId === itemId}
                      onToggle={() => handleToggle(itemId)}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Still have questions */}
        <div className="flex flex-col items-center gap-5 pt-4">
          <p className="text-[#B0BAC5] text-base md:text-lg text-center m-0">{faqConfig.footerText}</p>
          <a
            href={faqConfig.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full text-white text-lg md:text-xl shadow-lg border border-white/10 hover:brightness-110 transition"
            style={{
              backgroundColor: themeConfig.colors.primary,
              fontFamily: "'Minecraft Ten', sans-serif",
              letterSpacing: '0.05em',
            }}
          >
            <DiscordIcon size={28} color="#FFFFFF" />
            <span className="-mt-[3px]">{faqConfig.footerButtonLabel}</span>
          </a>
        </div>
      </div>
    </div>
  );
}