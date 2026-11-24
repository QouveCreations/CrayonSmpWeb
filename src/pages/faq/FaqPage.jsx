import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, X } from 'lucide-react';
import { faqConfig } from '../../config/faq.config';
import { themeConfig } from '../../config/theme.config';
import { SectionTitle } from '../../shared/components/SectionTitle';
import { DiscordIcon } from '../../components/icons/DiscordIcon';
import { FaqHero } from './components/FaqHero';
import { FaqItem } from './components/FaqItem';

const resolveAccent = (accentColor) =>
  accentColor === 'primary' || !accentColor ? themeConfig.colors.primary : accentColor;

const normalize = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export function FaqPage() {
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  // Press "/" anywhere on the page to jump into the search
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if (isTyping) return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const searchTerms = useMemo(
    () => normalize(query).split(/\s+/).filter(Boolean),
    [query]
  );
  const isSearching = searchTerms.length > 0;

  // Every search word has to appear in the question or the answer
  const visibleCategories = useMemo(() => {
    if (!isSearching) return faqConfig.categories;

    return faqConfig.categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          const haystack = normalize(`${item.question} ${item.answer}`);
          return searchTerms.every((term) => haystack.includes(term));
        }),
      }))
      .filter((category) => category.items.length > 0);
  }, [isSearching, searchTerms]);

  const resultCount = visibleCategories.reduce((sum, category) => sum + category.items.length, 0);

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{ backgroundColor: themeConfig.colors.background }}
    >
      {/* Search lives inside the hero, so it takes no extra space on the page */}
      <FaqHero>
        <div className="group relative w-full">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#B0BAC5] group-focus-within:text-white transition-colors"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpenId(null);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                if (query) setQuery('');
                else event.currentTarget.blur();
              }
            }}
            placeholder="Search the FAQ..."
            aria-label="Search the FAQ"
            autoComplete="off"
            spellCheck={false}
            className="w-full h-12 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/50 focus:bg-black/60 border border-white/15 hover:border-white/25 focus:border-[#FF0040]/60 outline-none text-white placeholder:text-[#B0BAC5]/70 text-base pl-11 pr-20 transition-colors"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {isSearching ? (
              <>
                <span className="text-sm text-[#B0BAC5] tabular-nums" aria-hidden="true">
                  {resultCount}
                </span>
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border-0 cursor-pointer transition-colors"
                >
                  <X size={14} color="#FFFFFF" />
                </button>
              </>
            ) : (
              <kbd
                aria-hidden="true"
                className="hidden md:flex items-center justify-center w-6 h-6 rounded border border-white/15 text-xs leading-none text-[#B0BAC5]/70 font-sans"
              >
                /
              </kbd>
            )}
          </div>

          <span className="sr-only" aria-live="polite">
            {isSearching ? `${resultCount} ${resultCount === 1 ? 'result' : 'results'}` : ''}
          </span>
        </div>
      </FaqHero>

      <div className="w-full max-w-4xl px-6 md:px-12 py-10 md:py-16 z-10 relative flex flex-col gap-8 md:gap-12">
        {/* No results: one quiet line */}
        {isSearching && resultCount === 0 && (
          <p className="m-0 text-center text-sm md:text-base text-[#B0BAC5]">
            Nothing found. Try another word or{' '}
            <a
              href={faqConfig.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link text-white"
            >
              ask us on Discord
            </a>
            .
          </p>
        )}

        {/* Categories */}
        <div className="flex flex-col gap-14 md:gap-20">
          {visibleCategories.map((category) => {
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
        </div>

        {/* Still have questions */}
        <div className="flex flex-col items-center gap-5 pt-6 md:pt-8">
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