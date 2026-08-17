import { themeConfig } from './theme.config';

export const heroConfig = {
  headline: {
    fontFamily: '"Minecraft Ten", sans-serif',
    blendMode: 'difference', // using difference so text perfectly inverts against the voxel cubes

    line1: {
      text: "Welcome to",
      color: themeConfig.colors.text, // #FFFFFF
      size: 'clamp(2rem, 5vw, 4rem)',
      letterSpacing: '0.05em',
      offsetX: 0, // Shift left/right in pixels
      offsetY: -380  // Shift up/down in pixels (negative = up)
    },
    line2: {
      text: "CrayonSMP",
      color: themeConfig.colors.primary, // #FF0040
      size: 'clamp(4rem, 10vw, 8rem)',
      letterSpacing: '0.02em',
      offsetX: 0,
      offsetY: -360
    }
  }
};
