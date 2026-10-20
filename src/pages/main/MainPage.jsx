import React from 'react';
import { HeroBlur } from './components/HeroBlur/HeroBlur';
import { IsoGrid } from './components/IsoGrid/IsoGrid';
import { WorldGenSection } from './components/WorldGenSection/WorldGenSection';
import { WhatIsSection } from './components/WhatIsSection/WhatIsSection';
import { PartnersSection } from './components/PartnersSection/PartnersSection';
import { JoinCommunitySection } from './components/JoinCommunitySection/JoinCommunitySection';
import { useIsMobile } from '../../shared/utils/deviceDetect';
import {NewTrailerSection} from "./components/NewTrailerSection/NewTrailerSection.jsx";

export function MainPage() {
  const isMobile = useIsMobile();

  return (
    <>
      <HeroBlur>
        {!isMobile && <IsoGrid />}
      </HeroBlur>
      <WhatIsSection />
      <NewTrailerSection />
      <WorldGenSection />
      <JoinCommunitySection />
      <PartnersSection />
    </>
  );
}
