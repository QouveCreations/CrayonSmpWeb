import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAnimation } from 'framer-motion';

export function usePillTransition(activeIndex) {
  const [bounds, setBounds] = useState([]);
  const pillRefs = useRef([]);
  const controls = useAnimation();
  const prevIndex = useRef(activeIndex !== -1 ? activeIndex : 0);

  const activeIndexRef = useRef(activeIndex);
  useLayoutEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useLayoutEffect(() => {
    // Measure initial bounds
    const measureBounds = () => {
      const newBounds = pillRefs.current.map(el => {
        if (!el) return { left: 0, width: 0, height: 0, top: 0 };
        return { 
          left: el.offsetLeft, 
          width: el.offsetWidth,
          height: el.offsetHeight,
          top: el.offsetTop
        };
      });
      setBounds(newBounds);
      
      // Set position without animation (used on mount and resize)
      const targetIndex = activeIndexRef.current !== -1 ? activeIndexRef.current : prevIndex.current;
      if (newBounds[targetIndex]) {
        controls.set({ 
          left: newBounds[targetIndex].left, 
          width: newBounds[targetIndex].width,
          opacity: activeIndexRef.current === -1 ? 0 : 1
        });
      }
    };
    
    // Add small delay to ensure DOM is ready
    const timeoutId = setTimeout(measureBounds, 10);
    window.addEventListener('resize', measureBounds);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', measureBounds);
    }
  }, [controls]);

  useEffect(() => {
    if (bounds.length === 0) return;
    
    if (activeIndex === -1) {
      controls.start({ opacity: 0, transition: { duration: 0.2 } });
      return;
    }

    const curr = bounds[activeIndex];
    
    if (prevIndex.current === -1) {
      controls.start({
        left: curr.left,
        width: curr.width,
        opacity: 1,
        transition: { duration: 0.2 }
      });
      prevIndex.current = activeIndex;
      return;
    }

    const prev = bounds[prevIndex.current];
    
    if (activeIndex === prevIndex.current) {
      controls.start({ opacity: 1, transition: { duration: 0.2 } });
      return;
    }
    
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
      opacity: 1,
      transition: {
        duration: 0.4,
        times: [0, 0.5, 1],
        ease: "easeInOut"
      }
    });
    
    prevIndex.current = activeIndex;
  }, [activeIndex, bounds, controls]);

  return { controls, bounds, pillRefs, prevIndex };
}
