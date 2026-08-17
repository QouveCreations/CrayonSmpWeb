import { themeConfig } from './theme.config';

export const previewConfig = {
  // Gradient fill settings
  fillColor: themeConfig.colors.primary,
  maxOpacity: 0.6, // Opacity at the very bottom (base)
  previewYOffset: 0.02 // Offset to prevent z-fighting with target surface
};
