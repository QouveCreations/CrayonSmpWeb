import React from 'react';
import { HeroBlur } from './components/HeroBlur/HeroBlur';
import { IsoGrid } from './components/IsoGrid/IsoGrid';

export function MainPage() {
  return (
    <>
      <HeroBlur>
        <IsoGrid />
      </HeroBlur>
    </>
  );
}
