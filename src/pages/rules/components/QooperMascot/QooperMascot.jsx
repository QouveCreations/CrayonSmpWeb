import React, { useEffect, useRef, Suspense, useState } from 'react';
import { useGLTF, useAnimations, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { rulesMascotConfig } from '../../../../config/rules.hero.config';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Failed to load Mascot model:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

const MascotModel = () => {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/qooper_rules.gltf');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play 'rules' animation if it exists, otherwise play the first available animation
    const action = actions['rules'] || (Object.values(actions)[0]);
    if (action) {
      action.play();
    }
    return () => {
      if (action) action.stop();
    };
  }, [actions]);

  return (
    <group 
      ref={group} 
      dispose={null} 
      position={[0, rulesMascotConfig.modelYOffset, 0]} 
      rotation={[rulesMascotConfig.modelRotationX, rulesMascotConfig.modelRotationY, rulesMascotConfig.modelRotationZ]} 
      scale={[rulesMascotConfig.modelScale, rulesMascotConfig.modelScale, rulesMascotConfig.modelScale]}
    >
      <primitive object={scene} />
    </group>
  );
};

export const QooperMascot = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Canvas onCreated={() => setIsLoaded(true)}>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={50} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <MascotModel />
          </Suspense>
        </ErrorBoundary>
        
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

// Preload the model
useGLTF.preload('/models/qooper_rules.gltf');
