export const responsiveConfig = {
  // Breakpoints array for responsive step-scaling
  breakpoints: [
    { maxWidth: 640, scale: 0.5 },   // Mobile
    { maxWidth: 1024, scale: 0.75 }, // Tablet
    { maxWidth: Infinity, scale: 1.0 } // Desktop
  ]
};

// Evaluates the current window dimensions against the defined breakpoints
export const getResponsiveScale = (windowWidth, windowHeight) => {
  // If height is particularly short (e.g., small laptops or landscape mobile)
  // we want to force a smaller scale so the 3D models don't overlap UI.
  let baseScale = 1.0;
  
  for (const bp of responsiveConfig.breakpoints) {
    if (windowWidth <= bp.maxWidth) {
      baseScale = bp.scale;
      break;
    }
  }

  // Aggressively scale down if the screen is very short, regardless of width
  if (windowHeight && windowHeight < 700) {
    baseScale = Math.min(baseScale, 0.65);
  } else if (windowHeight && windowHeight < 850) {
    baseScale = Math.min(baseScale, 0.8);
  }

  return baseScale;
};
