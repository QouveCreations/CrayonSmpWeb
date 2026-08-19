import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../../../shared/utils/deviceDetect';
import { worldGenConfig } from '../../../../config/worldgen.config';

export function WorldGenCarousel({ images, autoplayIntervalMs = 5000 }) {
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = useIsMobile();

  if (!images || images.length === 0) return null;

  useEffect(() => {
    const handleVisibilityChange = () => setIsVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const slide = (direction) => {
    setVirtualIndex((prev) => direction === 'next' ? prev + 1 : prev - 1);
  };

  useEffect(() => {
    if (isHovered || !isVisible || !autoplayIntervalMs) return;
    const interval = setInterval(() => {
      slide('next');
    }, autoplayIntervalMs);
    return () => clearInterval(interval);
  }, [isHovered, isVisible, virtualIndex, autoplayIntervalMs]);

  // Ensure off-screen elements persist (far-left/far-right) so they smoothly
  // slide in without key-based remounts popping them in.
  const slots = [
    { pos: 'far-left',  offset: -2 },
    { pos: 'left',      offset: -1 },
    { pos: 'center',    offset: 0 },
    { pos: 'right',     offset: 1 },
    { pos: 'far-right', offset: 2 }
  ];

  const leftOffset = isMobile ? (worldGenConfig.mobile?.edgeOffset || '1rem') : (worldGenConfig.desktop?.edgeOffset || '15%');
  const rightOffset = isMobile ? (worldGenConfig.mobile?.edgeOffset || '1rem') : (worldGenConfig.desktop?.edgeOffset || '15%');
  
  const btnClass = isMobile 
    ? "absolute z-20 cursor-pointer flex items-center justify-center w-12 h-12 shadow-lg hover:scale-105 active:scale-95 transition-transform border-[2px] border-white/10" 
    : "absolute z-20 cursor-pointer text-white/50 hover:text-white transition-colors duration-300 p-2";
    
  const btnStyle = isMobile ? {
    backgroundColor: worldGenConfig.mobile?.buttonStyle?.background || '#101013',
    color: worldGenConfig.mobile?.buttonStyle?.color || '#FF0040',
    borderRadius: worldGenConfig.mobile?.buttonStyle?.rounded === 'full' ? '9999px' : '0.5rem'
  } : {};

  return (
    // Issue 2 Fix: Removed `overflow-hidden` so peek images aren't square-cut by the max-w container box.
    <div 
      className="relative w-full max-w-6xl mx-auto h-64 md:h-[450px] flex items-center justify-center py-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false}>
        {slots.map(({ pos, offset }) => {
          const itemIndex = virtualIndex + offset;
          // Resolve slot index securely through modulo at all times
          const trueIndex = ((itemIndex % images.length) + images.length) % images.length;
          const src = images[trueIndex];
          
          let x = '0%';
          let scale = 0.7;
          let zIndex = 0;

          if (pos === 'center') {
            x = '0%';
            scale = 1;
            zIndex = 10;
          } else if (pos === 'left') {
            x = '-65%';
            scale = 0.8;
            zIndex = 5;
          } else if (pos === 'right') {
            x = '65%';
            scale = 0.8;
            zIndex = 5;
          } else if (pos === 'far-left') {
            x = '-130%';
            scale = 0.8;
            zIndex = 0;
          } else if (pos === 'far-right') {
            x = '130%';
            scale = 0.8;
            zIndex = 0;
          }

          const isVisible = pos === 'center' || pos === 'left' || pos === 'right';
          const initialX = offset > 0 ? '130%' : offset < 0 ? '-130%' : '0%';
          const exitX = offset > 0 ? '130%' : offset < 0 ? '-130%' : '0%';

          return (
            <motion.div
              key={itemIndex}
              initial={{ 
                x: initialX, 
                scale: 0.8, 
                opacity: 0, 
                zIndex: 0 
              }}
              animate={{ x, scale, opacity: isVisible ? 1 : 0, zIndex }}
              exit={{ 
                x: exitX, 
                scale: 0.8, 
                opacity: 0, 
                zIndex: 0 
              }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="absolute top-0 bottom-0 w-[60%] sm:w-[50%] md:w-[60%] flex items-center justify-center rounded-2xl"
            >
              {/* Image with dynamic opacity dropoff */}
              <motion.img 
                src={src} 
                alt={`World Gen ${trueIndex}`} 
                initial={false}
                animate={{ opacity: pos === 'center' ? 1 : 0.4 }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)]"
              />
              
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div 
        className={btnClass}
        style={{ left: leftOffset, ...btnStyle }}
        onClick={() => slide('prev')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "24" : "48"} height={isMobile ? "24" : "48"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </div>
      
      <div 
        className={btnClass}
        style={{ right: rightOffset, ...btnStyle }}
        onClick={() => slide('next')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "24" : "48"} height={isMobile ? "24" : "48"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </div>
    </div>
  );
}
