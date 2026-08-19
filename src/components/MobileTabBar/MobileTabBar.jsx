import React, { forwardRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { themeConfig } from '../../config/theme.config';
import { mobileNavConfig } from '../../config/mobile.nav.config';
import { usePillTransition } from '../../shared/hooks/usePillTransition';
import { X } from 'lucide-react';

const MobileTab = forwardRef(({ item, isActive, onClick }, ref) => {
  const Icon = item.icon;
  return (
    <div
      onClick={onClick}
      className="py-2 cursor-pointer transition-colors duration-300 z-20 flex flex-col items-center justify-center shrink-0"
      style={{
        color: isActive ? themeConfig.colors.primary : themeConfig.colors.text
      }}
    >
      <div ref={ref} className="relative z-20 flex items-center justify-center w-16 h-16">
        {Icon && <Icon className="w-7 h-7" />}
      </div>
    </div>
  );
});

export const MobileTabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);

  React.useEffect(() => {
    setPendingPath(null);
  }, [location.pathname]);
  
  const baseNavItems = mobileNavConfig.mainItems.filter(item => !mobileNavConfig.blacklist.includes(item.id));
  
  const navItems = mobileNavConfig.enableMenuButton 
    ? [...baseNavItems, { id: 'mobile-menu', label: 'Menu', icon: isMenuOpen ? X : mobileNavConfig.menuIcon }]
    : baseNavItems;
    
  const currentPath = pendingPath || location.pathname;
  const activeRouteIndex = baseNavItems.findIndex(item => item.path === currentPath);
  const isRouteInMenu = mobileNavConfig.extraMenuItems.some(item => !item.external && item.path === currentPath);

  let activeIndex = activeRouteIndex;
  if (mobileNavConfig.enableMenuButton) {
    if (isMenuOpen || isRouteInMenu) {
      activeIndex = navItems.length - 1;
    }
  }

  const { controls, bounds, pillRefs, prevIndex } = usePillTransition(activeIndex);

  // 64px per item, 8px gap between, 8px padding left/right (total 16px)
  const closedWidth = navItems.length * 64 + (navItems.length - 1) * 8 + 16;

  return (
    <nav 
      className="fixed z-50 border backdrop-blur-xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
      style={{
        bottom: 'calc(1rem + env(safe-area-inset-bottom))',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(16, 16, 19, 0.75)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        width: `${closedWidth}px`,
        borderRadius: '40px',
      }}
    >
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { height: 0 },
              visible: {
                height: 'auto',
                transition: {
                  height: { duration: 0.3, ease: 'easeInOut' },
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              },
              exit: {
                height: 0,
                transition: {
                  height: { duration: 0.3, ease: 'easeInOut', delay: 0.2 },
                  staggerChildren: 0.05,
                  staggerDirection: -1
                }
              }
            }}
            className="w-full flex flex-col px-6 pt-6 pb-2 gap-4"
          >
            {mobileNavConfig.extraMenuItems.map(item => (
              <motion.div 
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
                  exit: { opacity: 0, transition: { duration: 0.1 } }
                }}
                onClick={() => {
                  if (item.external) {
                    window.open(item.url, '_blank');
                  } else {
                    setPendingPath(item.path);
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }
                }}
                className="flex items-center gap-4 text-white/80 hover:text-white transition-colors cursor-pointer py-2"
              >
                {item.icon && <item.icon className="w-6 h-6" />}
                <span className="text-lg font-medium">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Standard Tab Bar */}
      <div className="relative flex items-center justify-center gap-2 px-2 h-20 shrink-0 w-full">
        {bounds.length > 0 && (
          <motion.div
            className="absolute z-10 rounded-full border-[2px] border-white/10"
            style={{ 
              backgroundColor: themeConfig.colors.primaryMuted,
              height: '64px',
              top: '50%',
              marginTop: '-32px'
            }}
            initial={{ 
              left: bounds[prevIndex.current !== -1 ? prevIndex.current : 0]?.left || 0, 
              width: bounds[prevIndex.current !== -1 ? prevIndex.current : 0]?.width || 0,
              opacity: activeIndex === -1 ? 0 : 1
            }}
            animate={controls}
          />
        )}
        
        {navItems.map((item, index) => (
          <MobileTab
            key={item.id}
            item={item}
            isActive={activeIndex === index}
            onClick={() => {
              if (item.id === 'mobile-menu') {
                setIsMenuOpen(!isMenuOpen);
              } else {
                setPendingPath(item.path);
                navigate(item.path);
                setIsMenuOpen(false);
              }
            }}
            ref={el => pillRefs.current[index] = el}
          />
        ))}
      </div>
    </nav>
  );
};
