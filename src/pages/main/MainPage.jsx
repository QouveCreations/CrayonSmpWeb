import React from 'react';
import { HeroBlur } from './components/HeroBlur/HeroBlur';
import { IsoGrid } from './components/IsoGrid/IsoGrid';
import { WorldGenSection } from './components/WorldGenSection/WorldGenSection';

export function MainPage() {
  return (
    <>
      <HeroBlur>
        <IsoGrid />
      </HeroBlur>
      <WorldGenSection />
    </>
  );
}
