import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera, OrbitControls, Grid } from '@react-three/drei';
import { voxelLogoConfig } from '../../../../config/voxel-logo.config';
import { gridConfig } from '../../../../config/grid.config';
import { themeConfig } from '../../../../config/theme.config';
import { previewConfig } from '../../../../config/preview.config';
import { responsiveConfig, getResponsiveScale } from '../../../../config/responsive.config';
import { PlacementPreview } from '../PlacementPreview/PlacementPreview';
import * as THREE from 'three';

function useResponsiveScale(customConfig) {
  const config = customConfig || responsiveConfig;
  const getScale = (width) => {
    for (const bp of config.breakpoints) {
      if (width <= bp.maxWidth) {
        return bp.scale;
      }
    }
    return 1.0;
  };

  const [scale, setScale] = useState(() => typeof window !== 'undefined' ? getScale(window.innerWidth) : 1);

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScale(getScale(window.innerWidth));
      }, 150); // 150ms debounce
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [config]);

  return scale;
}

const Voxel = ({ colX, heightIndex, colZ, baseColor, isLogo, onPlaceBlock, onPreviewBlock, cellSize, scale, interactive = true }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  
  const [spawned] = useState(!isLogo); 
  const [startTime] = useState(() => performance.now());

  // Derive world positions from pure indices and current scaled cellSize
  const worldX = colX * cellSize + cellSize / 2;
  const worldY = heightIndex * cellSize;
  const worldZ = colZ * cellSize + cellSize / 2;

  // Compute final color dynamically on render (no per-frame overhead)
  const scaledBlurCenter = {
    x: gridConfig.fade.blurCenter.x * scale,
    z: gridConfig.fade.blurCenter.z * scale
  };
  const maxFadeDistance = gridConfig.fade.maxFadeDistance * scale;
  const dx = worldX - scaledBlurCenter.x;
  const dz = worldZ - scaledBlurCenter.z;
  const dist = Math.sqrt(dx * dx + dz * dz);
  
  const t = Math.min(dist / maxFadeDistance, 1.0);
  let factor = 1.0 - t;
  if (gridConfig.fade.falloffCurve === 'easeOut') {
    factor = 1.0 - Math.pow(t, 2);
  }
  const c = new THREE.Color(baseColor);
  c.lerp(new THREE.Color(0x000000), 1.0 - factor);
  const finalColor = '#' + c.getHexString();

  useFrame(() => {
    if (!spawned || !meshRef.current || !materialRef.current) return;
    
    const elapsed = (performance.now() - startTime) / 1000;
    const { duration } = gridConfig.animation;
    const dropOffset = gridConfig.animation.dropOffset * scale;
    
    if (elapsed < duration) {
      const t = elapsed / duration;
      const ease = 1 - Math.pow(1 - t, 3);
      
      meshRef.current.position.y = worldY + dropOffset * (1 - ease);
      materialRef.current.opacity = ease;
    } else {
      meshRef.current.position.y = worldY;
      materialRef.current.opacity = 1;
    }
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (e.face && e.face.normal.y > 0.5) {
      onPlaceBlock(colX, colZ);
    }
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    if (e.face && e.face.normal.y > 0.5) {
      onPreviewBlock({ colX, heightIndex: heightIndex + 1, colZ });
    } else {
      onPreviewBlock(null);
    }
  };

  const handlePointerOut = (e) => {
    onPreviewBlock(null);
  };

  return (
    <mesh 
      ref={meshRef} 
      position={spawned ? [worldX, worldY + gridConfig.animation.dropOffset * scale, worldZ] : [worldX, worldY, worldZ]}
      onPointerDown={interactive ? handlePointerDown : undefined}
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerOut={interactive ? handlePointerOut : undefined}
      userData={{ colX, colZ }}
    >
      <boxGeometry args={[cellSize, cellSize, cellSize]} />
      <meshStandardMaterial 
        ref={materialRef}
        color={finalColor} 
        emissive={!isLogo ? finalColor : "#f7f3f3"} 
        emissiveIntensity={!isLogo ? 0.3 : 0}
        transparent={spawned}
        opacity={spawned ? 0 : 1}
      />
    </mesh>
  );
};

const InteractiveGridPlane = ({ onPlaceBlock, onPreviewBlock, cellSize, scale }) => {
  const handlePointerDown = (e) => {
    e.stopPropagation();
    const colX = Math.floor(e.point.x / cellSize);
    const colZ = Math.floor(e.point.z / cellSize);
    onPlaceBlock(colX, colZ);
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    const colX = Math.floor(e.point.x / cellSize);
    const colZ = Math.floor(e.point.z / cellSize);
    onPreviewBlock({ colX, heightIndex: 0, colZ });
  };

  const handlePointerOut = (e) => {
    onPreviewBlock(null);
  };

  const gridWidth = gridConfig.width * scale;
  const gridHeight = gridConfig.height * scale;

  return (
    <mesh 
      position={[0, -cellSize / 2, 0]} 
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
      visible={false} 
    >
      <planeGeometry args={[gridWidth, gridHeight]} />
      <meshBasicMaterial side={THREE.DoubleSide} />
    </mesh>
  );
};

const Scene = ({ interactive = true, scaleConfig, showLogo = true }) => {
  const scale = useResponsiveScale(scaleConfig);
  const cellSize = gridConfig.cellSize * scale;

  const [previewIndices, setPreviewIndices] = useState(null);
  const [columns, setColumns] = useState(() => {
    const initialCols = {};
    
    if (showLogo) {
      voxelLogoConfig.voxels.forEach(voxel => {
        const colX = voxel.position[0];
        const colZ = -voxel.position[1];
        const key = `${colX},${colZ}`;
        
        if (!initialCols[key]) {
          initialCols[key] = { colX, colZ, stack: [] };
        }
        
        initialCols[key].stack.push({
          baseColor: voxel.color,
          isLogo: true
        });
      });
    }
    
    return initialCols;
  });

  const handlePlaceBlock = (colX, colZ) => {
    if (!interactive) return;
    const key = `${colX},${colZ}`;

    setColumns(prev => {
      const existingCol = prev[key] || { colX, colZ, stack: [] };
      
      return {
        ...prev,
        [key]: {
          ...existingCol,
          stack: [
            ...existingCol.stack, 
            { baseColor: themeConfig.colors.cubeColor, isLogo: false }
          ]
        }
      };
    });
  };

  const handlePreviewBlock = (indices) => {
    if (!interactive) return;
    setPreviewIndices(indices);
  };

  // Compute preview position and color dynamically on render based on scale
  let previewPos = null;
  let fadedPreviewColor = previewConfig.fillColor;
  
  if (previewIndices && interactive) {
    const worldX = previewIndices.colX * cellSize + cellSize / 2;
    const worldY = previewIndices.heightIndex * cellSize;
    const worldZ = previewIndices.colZ * cellSize + cellSize / 2;
    previewPos = [worldX, worldY, worldZ];
    
    const scaledBlurCenter = {
      x: gridConfig.fade.blurCenter.x * scale,
      z: gridConfig.fade.blurCenter.z * scale
    };
    const maxFadeDistance = gridConfig.fade.maxFadeDistance * scale;
    const dx = worldX - scaledBlurCenter.x;
    const dz = worldZ - scaledBlurCenter.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    
    const t = Math.min(dist / maxFadeDistance, 1.0);
    let factor = 1.0 - t;
    if (gridConfig.fade.falloffCurve === 'easeOut') {
      factor = 1.0 - Math.pow(t, 2);
    }
    const c = new THREE.Color(previewConfig.fillColor);
    c.lerp(new THREE.Color(0x000000), 1.0 - factor);
    fadedPreviewColor = '#' + c.getHexString();
  }

  const gridWidth = gridConfig.width * scale;
  const gridHeight = gridConfig.height * scale;

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[10 * scale, 20 * scale, 10 * scale]} intensity={2.5} />
      <directionalLight position={[-10 * scale, 20 * scale, -10 * scale]} intensity={0.5} />
      
      {Object.values(columns).map(col => 
        col.stack.map((block, i) => (
          <Voxel 
            key={`cube-${col.colX}-${col.colZ}-${i}`} 
            colX={col.colX}
            heightIndex={i}
            colZ={col.colZ}
            baseColor={block.baseColor} 
            isLogo={block.isLogo} 
            onPlaceBlock={handlePlaceBlock}
            onPreviewBlock={handlePreviewBlock}
            cellSize={cellSize}
            scale={scale}
            interactive={interactive}
          />
        ))
      )}

      {interactive && (
        <>
          <InteractiveGridPlane 
            onPlaceBlock={handlePlaceBlock} 
            onPreviewBlock={handlePreviewBlock} 
            cellSize={cellSize}
            scale={scale}
          />
          
          <PlacementPreview 
            position={previewPos} 
            color={fadedPreviewColor} 
            size={cellSize} 
            scale={scale} 
          />
        </>
      )}

      <Grid 
        position={[0, -cellSize / 2, 0]} 
        args={[gridWidth, gridHeight]} 
        cellSize={cellSize} 
        cellThickness={1} 
        cellColor={themeConfig.colors.gridLineColor} 
        sectionSize={cellSize} 
        sectionThickness={1} 
        sectionColor={themeConfig.colors.gridLineColor} 
        fadeDistance={gridConfig.fade.maxFadeDistance * scale} 
        fadeStrength={1.5}
      />
    </>
  );
};

export const IsoGrid = ({ interactive = true, scaleConfig, showLogo = true }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Canvas onCreated={() => setIsLoaded(true)}>
        <OrthographicCamera 
          makeDefault 
          position={[50, 50, 50]} 
          zoom={12} 
        />
        <Scene interactive={interactive} scaleConfig={scaleConfig} showLogo={showLogo} />
        <OrbitControls enableRotate={false} enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
};
