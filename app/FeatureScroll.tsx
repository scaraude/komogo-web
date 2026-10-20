'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export type Feature = { kicker: string; title: string; text: string; screen: { src: string; alt: string } }

/**
 * The phone sticks in the middle column while the feature blocks scroll past on either side;
 * its screen follows whichever block crosses the middle of the window.
 */
export function FeatureScroll({ features }: { features: Feature[] }) {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(stepRefs.current.indexOf(entry.target as HTMLDivElement))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    for (const step of stepRefs.current) if (step) observer.observe(step)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="mx-auto max-w-[1240px] px-6 pb-40 pt-10">
      <div className="grid grid-cols-[minmax(0,1fr)] min-[900px]:grid-cols-[minmax(0,1fr)_340px_minmax(0,1fr)] min-[900px]:gap-x-[72px]">
        <div className="sticky top-3 z-[2] col-start-1 w-[190px] self-start justify-self-center [grid-row:1/span_5] min-[900px]:top-20 min-[900px]:col-start-2 min-[900px]:w-full">
          <div className="relative aspect-[9/20] w-full overflow-hidden rounded-[50px] border-[10px] border-ink bg-paper shadow-[0_40px_80px_rgba(34,31,26,0.25)]">
            <div
              className="flex h-full flex-col [transition:transform_.7s_cubic-bezier(.6,0,.3,1)] motion-reduce:transition-none"
              style={{ transform: `translateY(-${active * 100}%)` }}
            >
              {features.map(({ screen }, index) => (
                <Image
                  key={screen.src}
                  src={screen.src}
                  alt={screen.alt}
                  width={720}
                  height={1600}
                  sizes="(min-width: 900px) 320px, 170px"
                  // Clipped by the frame until their turn comes: lazy loading would show them blank.
                  loading="eager"
                  fetchPriority="low"
                  aria-hidden={index !== active}
                  className="h-full w-full shrink-0 grow-0 basis-full object-cover object-top"
                />
              ))}
            </div>
          </div>
        </div>

        {features.map((feature, index) => (
          <div
            key={feature.screen.src}
            ref={(element) => {
              stepRefs.current[index] = element
            }}
            style={{ gridRow: index + 1 }}
            className={`col-start-1 flex min-h-[680px] flex-col justify-center gap-4 pt-[470px] transition-opacity duration-400 motion-reduce:transition-none min-[900px]:pt-0 ${
              index % 2 === 0 ? 'min-[900px]:col-start-1' : 'min-[900px]:col-start-3'
            } ${index === active ? 'opacity-100' : 'opacity-[.28]'}`}
          >
            <span className="font-serif text-[18px] font-semibold text-terracotta-dk">{feature.kicker}</span>
            <h3 className="font-serif text-[38px] font-semibold leading-[1.12]">{feature.title}</h3>
            <p className="max-w-[400px] text-[18px] leading-[1.6] text-body">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
