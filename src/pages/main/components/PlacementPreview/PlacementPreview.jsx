import React, { useMemo } from 'react';
import * as THREE from 'three';
import { gridConfig } from '../../../../config/grid.config';
import { previewConfig } from '../../../../config/preview.config';

export const PlacementPreview = ({ position, color, size, scale = 1 }) => {
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(previewConfig.fillColor) },
        uSize: { value: size },
        uMaxOpacity: { value: previewConfig.maxOpacity }
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        uniform vec3 uColor;
        uniform float uSize;
        uniform float uMaxOpacity;
        void main() {
          // Normalize Y from bottom (-uSize/2) to top (+uSize/2)
          float normalizedY = (vPosition.y + uSize / 2.0) / uSize;
          
          // 0% opacity at top (normalizedY=1), max opacity at bottom (normalizedY=0)
          float alpha = (1.0 - normalizedY) * uMaxOpacity;
          
          gl_FragColor = vec4(uColor, alpha);
          
          // CRITICAL: Three.js r152+ assumes sRGB working color space but ShaderMaterial 
          // outputs Linear color by default unless we include the color conversion chunks.
          // This fixes the bug where #FF0040 renders too dark/orange (~#D9010D).
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
      transparent: true,
      depthWrite: false, // Ensure it doesn't z-fight aggressively and acts like a ghost
      side: THREE.DoubleSide
    });
  }, [size]);

  // Update uniform color directly to prevent GC churn (reusing the same material)
  if (color) {
    shaderMaterial.uniforms.uColor.value.set(color);
  }

  // Render nothing if no valid position is hovered
  if (!position) return null;

  // Apply previewYOffset to lift the mesh slightly off the target face, eliminating Z-fighting
  const offsetPosition = [
    position[0],
    position[1] + (previewConfig.previewYOffset || 0.02) * scale,
    position[2]
  ];

  return (
    <mesh position={offsetPosition} material={shaderMaterial}>
      <boxGeometry args={[size, size, size]} />
    </mesh>
  );
};
