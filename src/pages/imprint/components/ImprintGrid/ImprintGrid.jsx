import React from 'react';
import { imprintGridConfig } from '../../../../config/imprint.hero.config';

export const ImprintGrid = () => {
  const { cellSize, lineColor, lineOpacity, lineThickness, transform, fade } = imprintGridConfig;

  // CSS repeating-linear-gradient to draw grid lines
  const backgroundStyle = {
    backgroundImage: `
      repeating-linear-gradient(to right, ${lineColor} 0, ${lineColor} ${lineThickness}px, transparent ${lineThickness}px, transparent ${cellSize}px),
      repeating-linear-gradient(to bottom, ${lineColor} 0, ${lineColor} ${lineThickness}px, transparent ${lineThickness}px, transparent ${cellSize}px)
    `,
    backgroundSize: `${cellSize}px ${cellSize}px`,
    opacity: lineOpacity,
    transform: `perspective(${transform.perspective}) rotateX(${transform.rotateX}) rotateZ(${transform.rotateZ}) scale(${transform.scale})`,
    transformOrigin: 'center center',
    maskImage: fade.maskImage,
    WebkitMaskImage: fade.maskImage, // For broader browser support
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <div 
        className="w-[200vw] h-[200vh] pointer-events-none"
        style={backgroundStyle}
      />
    </div>
  );
};
