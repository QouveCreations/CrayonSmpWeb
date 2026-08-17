export const responsiveConfig = {
  // Breakpoints array for responsive step-scaling
  breakpoints: [
    { maxWidth: 640, scale: 0.5 },   // Mobile
    { maxWidth: 1024, scale: 0.75 }, // Tablet
    { maxWidth: Infinity, scale: 1.0 } // Desktop
  ]
};

// Evaluates the current window width against the defined breakpoints
export const getResponsiveScale = (windowWidth) => {
  for (const bp of responsiveConfig.breakpoints) {
    if (windowWidth <= bp.maxWidth) {
      return bp.scale;
    }
  }
  return 1.0;
};
