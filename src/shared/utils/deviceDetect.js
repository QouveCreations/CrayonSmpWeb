import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768; // Adjust based on standard viewports (e.g., < 768px for mobile)

export function useIsMobile() {
  const checkIsMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  };

  const [isMobile, setIsMobile] = useState(checkIsMobile);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(checkIsMobile());
      }, 150); // 150ms debounce
    };

    window.addEventListener('resize', handleResize);
    // Initial check just in case
    setIsMobile(checkIsMobile());

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return isMobile;
}
