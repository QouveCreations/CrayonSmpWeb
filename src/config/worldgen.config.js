const imageFiles = import.meta.glob('/public/worldgen/*.{png,jpg,jpeg,webp}', { eager: true });

export const worldGenConfig = {
  title: "World Generation",
  description: "Explore a world shaped by our custom generation — modified terrain, structures, and biomes built specifically for CrayonSMP.",
  icon: "Globe",
  autoplayIntervalMs: 3000,
  images: Object.keys(imageFiles).map(path => path.replace('/public', '')),
  mobile: {
    edgeOffset: '1rem',
    buttonStyle: {
      background: '#101013', // surface background
      color: '#FFFFFF', // white arrows
      rounded: 'full' // fully rounded circle/pill
    }
  },
  desktop: {
    edgeOffset: '4rem'
  }
};
