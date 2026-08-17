import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { navConfig } from '../../config/nav.config';
import { categoryBlacklist } from '../../config/nav.blacklist.config';
import { NavPill } from '../NavPill/NavPill';
import { themeConfig } from '../../config/theme.config';

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const visibleNavItems = navConfig.items.filter(item => !categoryBlacklist.includes(item.id));
  const currentIndex = visibleNavItems.findIndex(item => item.path === location.pathname);
  const activeIndex = currentIndex !== -1 ? currentIndex : 0;

  const [bounds, setBounds] = useState([]);
  const pillRefs = useRef([]);
  const controls = useAnimation();
  const prevIndex = useRef(activeIndex);

  useLayoutEffect(() => {
    // Measure initial bounds
    const measureBounds = () => {
      const newBounds = pillRefs.current.map(el => {
        if (!el) return { left: 0, width: 0 };
        return { left: el.offsetLeft, width: el.offsetWidth };
      });
      setBounds(newBounds);
      
      // Set position without animation (used on mount and resize)
      const targetIndex = prevIndex.current;
      if (newBounds[targetIndex]) {
        controls.set({ left: newBounds[targetIndex].left, width: newBounds[targetIndex].width });
      }
    };
    
    measureBounds();
    window.addEventListener('resize', measureBounds);
    return () => window.removeEventListener('resize', measureBounds);
  }, [controls]);

  useEffect(() => {
    if (bounds.length === 0) return;
    
    const curr = bounds[activeIndex];
    const prev = bounds[prevIndex.current];
    
    if (activeIndex === prevIndex.current) return;
    
    // Stretch then snap animation
    const isMovingRight = activeIndex > prevIndex.current;
    
    let midLeft = prev.left;
    let midWidth = prev.width;
    
    if (isMovingRight) {
      midWidth = curr.left + curr.width - prev.left;
    } else {
      midLeft = curr.left;
      midWidth = prev.left + prev.width - curr.left;
    }

    controls.start({
      left: [prev.left, midLeft, curr.left],
      width: [prev.width, midWidth, curr.width],
      transition: {
        duration: 0.4,
        times: [0, 0.5, 1],
        ease: "easeInOut"
      }
    });
    
    prevIndex.current = activeIndex;
  }, [activeIndex, bounds, controls]);

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
              left: bounds[prevIndex.current]?.left || 0, 
              width: bounds[prevIndex.current]?.width || 0 
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
