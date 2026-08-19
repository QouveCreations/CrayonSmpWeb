import React from 'react';
import { ExternalLink } from 'lucide-react';

const parseTextWithLinks = (text) => {
  const urlRegex = /((?:https?:\/\/[^\s]+)|(?:[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+))/g;
  const parts = text.split(urlRegex);

  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      const isEmail = part.includes('@') && !part.startsWith('http');
      const href = isEmail ? `mailto:${part}` : part;
      return (
        <a 
          key={i} 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-baseline gap-1 hover:text-white hover:underline transition-colors font-medium text-white/90"
        >
          {part}
          <ExternalLink size={14} className="opacity-70 relative top-[2px]" />
        </a>
      );
    }
    return part;
  });
};

export const ImprintCard = ({ content }) => {
  return (
    <div className="bg-[#101013] rounded-xl p-6 md:p-8 flex flex-col h-full border border-white/5 hover:border-white/10 transition-colors shadow-lg w-full">
      <div className="flex flex-col gap-2">
        {content.split('\n').map((line, index) => (
          <p key={index} className="text-[#B0BAC5] text-sm md:text-base leading-relaxed whitespace-pre-wrap m-0">
            {parseTextWithLinks(line)}
          </p>
        ))}
      </div>
    </div>
  );
};
