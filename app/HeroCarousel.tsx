'use client'

import Image from 'next/image'
import { useEffect, useState, type CSSProperties } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const INTERVAL_MS = 3200

export type CarouselScreen = { src: string; alt: string; dotLabel: string }

// iOS-style push: the next screen slides in from the right over the current one,
// which recedes to the left. Screens more than one step away stay invisible.
function slideStyle(offset: number): CSSProperties {
  if (offset === 0) return { transform: 'translateX(0%) scale(1)', opacity: 1, zIndex: 3, filter: 'brightness(1)' }
  if (offset > 0) {
    return { transform: `translateX(${offset * 100}%) scale(1)`, opacity: offset === 1 ? 1 : 0, zIndex: 4, filter: 'brightness(1)' }
  }
  return { transform: `translateX(${offset * 30}%) scale(0.94)`, opacity: offset === -1 ? 1 : 0, zIndex: 1, filter: 'brightness(0.8)' }
}

export function HeroCarousel({
  screens,
  label,
  roleDescription,
  dotsLabel,
}: {
  screens: CarouselScreen[]
  label: string
  roleDescription: string
  dotsLabel: string
}) {
  const [active, setActive] = useState(0)
  const reducedMotion = usePrefersReducedMotion()
  const count = screens.length

  // Re-armed on every change, so picking a screen with a dot restarts the timer.
  useEffect(() => {
    if (reducedMotion) return
    const timer = setTimeout(() => setActive((active + 1) % count), INTERVAL_MS)
    return () => clearTimeout(timer)
  }, [active, count, reducedMotion])

  return (
    <div
      role="region"
      aria-roledescription={roleDescription}
      aria-label={label}
      className="relative aspect-[370/798] w-[370px] max-w-full overflow-hidden rounded-[54px] border-[10px] border-ink bg-paper shadow-[0_30px_60px_rgba(34,31,26,0.18)]"
    >
      {screens.map((screen, index) => {
        let offset = (((index - active) % count) + count) % count
        if (offset > count / 2) offset -= count
        return (
          <Image
            key={screen.src}
            src={screen.src}
            alt={screen.alt}
            fill
            sizes="350px"
            // Off-screen slides are clipped by the frame: lazy loading would leave them blank as they slide in.
            loading="eager"
            fetchPriority={index === 0 ? 'high' : 'auto'}
            aria-hidden={offset !== 0}
            className="bg-paper object-cover object-top [transition:transform_.75s_cubic-bezier(.7,0,.2,1),opacity_.75s_ease,filter_.75s_ease] motion-reduce:transition-none"
            style={slideStyle(offset)}
          />
        )
      })}

      <div
        role="group"
        aria-label={dotsLabel}
        className="absolute left-1/2 top-[10px] z-10 flex -translate-x-1/2 rounded-full bg-ink/55 px-2"
      >
        {screens.map((screen, index) => (
          <button
            key={screen.src}
            type="button"
            aria-label={screen.dotLabel}
            aria-current={index === active}
            onClick={() => setActive(index)}
            className="group flex h-9 w-[30px] cursor-pointer items-center justify-center"
          >
            <span className="block h-1.5 w-1.5 rounded-full bg-on-dark/50 transition-[width,background-color] duration-300 group-aria-[current=true]:w-5 group-aria-[current=true]:bg-on-dark motion-reduce:transition-none" />
          </button>
        ))}
      </div>
    </div>
  )
}
