export const gridConfig = {
  // Define dimensions for the interactive grid (cells outside the logo)
  width: 500,
  height: 500,
  cellSize: 4, // unit size for 3D coordinates and cubes
  
  // Placement animation settings
  animation: {
    dropOffset: 2, // How many units above resting position to spawn
    duration: 0.25, // Seconds
  },

  // Distance-based fade from the hero blur center
  fade: {
    blurCenter: { x: 0, z: 0 },
    maxFadeDistance: 100,
    falloffCurve: 'easeOut' // 'linear' or 'easeOut'
  }
};


