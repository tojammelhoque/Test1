import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/scroll'

export default function Positioning() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
        defaults: { ease: 'power3.out' },
      })
      tl.fromTo('[data-step]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 })
        .fromTo(
          '[data-statement]',
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 1 },
          0.3,
        )
    },
    { scope: root },
  )

  const steps = ['Strategy', 'Design', 'Development', 'Launch']

  return (
    <section ref={root} aria-label="Positioning" className="py-28 md:py-44">
      <div className="container-site">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 font-display text-sm font-medium tracking-[0.08em] text-[var(--ink)] md:text-base">
          {steps.map((s, i) => (
            <span key={s} data-step className="flex items-center gap-4">
              <span className={i === 0 ? 'text-[var(--accent)]' : ''}>{s}</span>
              {i < steps.length - 1 && <span className="text-[var(--ink-3)]">→</span>}
            </span>
          ))}
        </div>

        <p
          data-statement
          className="font-display mt-14 max-w-4xl text-balance text-[clamp(1.6rem,3.6vw,2.9rem)] font-medium leading-[1.25] tracking-[-0.015em] text-[var(--ink)]"
        >
          I don’t just write code. I build websites designed to communicate your value clearly —
          and turn visitors into{' '}
          <em className="font-editorial font-normal italic">customers.</em>
        </p>
      </div>
    </section>
  )
}
