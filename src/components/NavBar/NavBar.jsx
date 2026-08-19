import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { navConfig } from '../../config/nav.config';
import { categoryBlacklist } from '../../config/nav.blacklist.config';
import { NavPill } from '../NavPill/NavPill';
import { themeConfig } from '../../config/theme.config';
import { usePillTransition } from '../../shared/hooks/usePillTransition';

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const visibleNavItems = navConfig.items.filter(item => !categoryBlacklist.includes(item.id));
  const activeIndex = visibleNavItems.findIndex(item => item.path === location.pathname);

  const { controls, bounds, pillRefs, prevIndex } = usePillTransition(activeIndex);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="relative flex items-center gap-1 p-2 rounded-full border shadow-lg backdrop-blur-md"
        style={{ 
          backgroundColor: 'rgba(16, 16, 19, 0.8)', 
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        {bounds.length > 0 && (
          <motion.div
            className="absolute top-2 bottom-2 rounded-full z-10"
            style={{ backgroundColor: themeConfig.colors.primaryMuted }}
            initial={{ 
              left: bounds[prevIndex.current !== -1 ? prevIndex.current : 0]?.left || 0, 
              width: bounds[prevIndex.current !== -1 ? prevIndex.current : 0]?.width || 0,
              opacity: activeIndex === -1 ? 0 : 1
            }}
            animate={controls}
          />
        )}
        
        {visibleNavItems.map((item, index) => (
          <NavPill
            key={item.id}
            item={item}
            isActive={activeIndex === index}
            onClick={() => navigate(item.path)}
            ref={el => pillRefs.current[index] = el}
          />
        ))}
      </div>
    </nav>
  );
};
