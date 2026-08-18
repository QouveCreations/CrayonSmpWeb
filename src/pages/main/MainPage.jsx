import React from 'react';
import { HeroBlur } from './components/HeroBlur/HeroBlur';
import { IsoGrid } from './components/IsoGrid/IsoGrid';
import { WorldGenSection } from './components/WorldGenSection/WorldGenSection';
import { WhatIsSection } from './components/WhatIsSection/WhatIsSection';

export function MainPage() {
  return (
    <>
      <HeroBlur>
        <IsoGrid />
      </HeroBlur>
      <WhatIsSection />
      <WorldGenSection />
    </>
  );
}
