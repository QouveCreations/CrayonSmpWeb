import React from 'react';
import { trailerConfig } from '../../../../config/trailer.config';
import { MonitorPlay, Megaphone } from 'lucide-react';
import { SectionTitle } from '../../../../shared/components/SectionTitle';

export function NewTrailerSection() {
  return (
      <section className="relative w-full py-16 md:py-28 z-20 flex flex-col items-center justify-center overflow-hidden">

        <div className="container mx-auto px-4 flex flex-col items-center relative z-10">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm">
            <Megaphone className="w-3.5 h-3.5" />
            <span>Official Release</span>
          </div>

          <SectionTitle
              title={trailerConfig.title}
              icon={MonitorPlay}
              className="mb-4 text-white text-center"
          />

          <p className="text-base md:text-lg text-center text-[#B0BAC5] max-w-2xl mb-10 leading-relaxed">
            {trailerConfig.description}
          </p>

          <div className="w-full max-w-4xl mx-auto">
            <div className="relative rounded-2xl p-1.5 bg-neutral-900/60 border border-white/10 shadow-2xl">

              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
                <iframe
                    className="w-full h-full border-0"
                    src="https://www.youtube.com/embed/CyRK970WJC8?si=gRaAVDxMrLVivP_s"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
              </div>

            </div>
          </div>

        </div>
      </section>
  );
}