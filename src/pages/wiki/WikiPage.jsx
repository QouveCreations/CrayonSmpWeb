import React from 'react';
import { ContentContainer } from '../../components/ContentContainer/ContentContainer';

export function WikiPage() {
  return (
    <ContentContainer>
      <div className="pt-24">
        <h1 className="text-5xl font-bold mb-4 text-[#FF0040]">Wiki</h1>
        <p className="text-[#B0BAC5] text-lg mb-8 leading-relaxed max-w-3xl">
          Comprehensive guides and information.
        </p>
      </div>
    </ContentContainer>
  );
}
