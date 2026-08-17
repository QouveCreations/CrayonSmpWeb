const imageFiles = import.meta.glob('/public/worldgen/*.{png,jpg,jpeg,webp}', { eager: true });

export const worldGenConfig = {
  title: "World Generation",
  description: "Explore a world shaped by our custom generation — modified terrain, structures, and biomes built specifically for CrayonSMP.",
  images: Object.keys(imageFiles).map(path => path.replace('/public', ''))
};
