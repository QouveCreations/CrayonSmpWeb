import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { themeConfig } from '../../../config/theme.config';

export function FaqItem({ item, id, isOpen, onToggle, accentColor }) {
  const Icon = item.icon ? LucideIcons[item.icon] : null;
  const accent = accentColor === 'primary' || !accentColor ? themeConfig.colors.primary : accentColor;
  const panelId = `faq-panel-${id}`;
  const buttonId = `faq-button-${id}`;

  return (
    <div
      className="rounded-2xl bg-[#101013]/90 backdrop-blur-md border-2 transition-colors duration-200 shadow-lg overflow-hidden"
      style={{ borderColor: isOpen ? `${accent}66` : 'rgba(255,255,255,0.05)' }}
    >
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full flex items-center gap-3 md:gap-5 text-left p-4 md:p-6 cursor-pointer bg-transparent border-0 hover:bg-white/[0.02] transition-colors"
        >
          {Icon && (
            <span
              className="shrink-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl border transition-colors duration-200"
              style={{
                backgroundColor: isOpen ? accent : 'rgba(255,255,255,0.05)',
                borderColor: isOpen ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
              }}
            >
              <Icon size={22} color="#FFFFFF" />
            </span>
          )}

          <span
            className="flex-1 text-white text-base md:text-xl tracking-wider leading-snug"
            style={{ fontFamily: "'Minecraft Ten', sans-serif" }}
          >
            {item.question}
          </span>

          <motion.span
            className="shrink-0 flex"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <ChevronDown size={24} color={isOpen ? accent : themeConfig.colors.textMuted} />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="m-0 px-4 pb-5 md:px-6 md:pb-6 md:pl-[5.5rem] text-[#B0BAC5] text-sm md:text-base leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
