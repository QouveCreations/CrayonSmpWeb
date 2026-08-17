export const techHeroResponsiveConfig = {
  // Breakpoints array for responsive step-scaling
  breakpoints: [
    { maxWidth: 640, scale: 0.3 },   // Mobile
    { maxWidth: 1024, scale: 0.5 }, // Tablet
    { maxWidth: Infinity, scale: 0.7 } // Desktop
  ]
};

export const techGridConfig = {
  cellSize: 25, // Base pixel size of grid cells
  lineColor: '#260010', // Assuming we keep the same grid line color for consistency or change if needed
  lineOpacity: 0.5,
  lineThickness: 1, // Line thickness in pixels
  transform: {
    perspective: '1000px',
    rotateX: '60deg',
    rotateZ: '45deg',
    scale: 2.0 // Scale up to cover hero bounds after rotation
  },
  fade: {
    maskImage: 'radial-gradient(circle at 50% 100%, black 0%, transparent 60%)'
  }
};

export const techMascotConfig = {
  modelYOffset: -2.35, // Adjust to move model down/up within the viewport
  modelScale: 2,
  modelRotationX: -0.2,
  modelRotationY: Math.PI + (5 * Math.PI / 180), // 180 degrees + 5 degrees
  modelRotationZ: 0,
};
