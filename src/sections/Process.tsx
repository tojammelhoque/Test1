import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/scroll'
import { processSteps } from '@/lib/data'

export default function Process() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // progress line draws with scroll
      gsap.fromTo(
        '[data-process-line]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-process-steps]',
            start: 'top 70%',
            end: 'bottom 55%',
            scrub: 1,
          },
        },
      )

      gsap.utils.toArray<HTMLElement>('[data-step-row]').forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 82%' },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="process" aria-label="Process" className="border-t border-[var(--line)] bg-[var(--paper-2)] py-24 md:py-36">
      <div className="container-site">
        <div className="mb-16 max-w-2xl md:mb-24">
          <p className="eyebrow mb-4">Process</p>
          <h2 className="font-display text-balance text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            From idea to <em className="font-editorial font-normal italic text-[var(--accent)]">launch</em>
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-[var(--ink-2)]">
            A clear, proven process. You know exactly what happens at every stage — no surprises,
            no disappearing acts.
          </p>
        </div>

        <div data-process-steps className="relative">
          <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-[var(--line)] md:left-1/2" />
          <div
            aria-hidden="true"
            data-process-line
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-[var(--accent)] md:left-1/2"
          />
          <ol className="flex flex-col gap-14 md:gap-20">
            {processSteps.map((s, i) => (
              <li
                key={s.index}
                data-step-row
                className="relative grid gap-3 pl-10 md:grid-cols-2 md:gap-16 md:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-[var(--accent)] bg-[var(--paper-2)] md:left-1/2 md:-translate-x-1/2"
                />
                <div className={i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:order-2 md:pl-16'}>
                  <span className="font-display text-xs font-medium tracking-[0.15em] text-[var(--ink-3)]">
                    {s.index}
                  </span>
                  <h3 className="font-display mt-2 text-2xl font-medium tracking-[-0.01em] md:text-3xl">
                    {s.title}
                  </h3>
                </div>
                <div className={i % 2 === 0 ? 'md:order-2 md:pl-16' : 'md:pr-16 md:text-right'}>
                  <p className="text-sm leading-relaxed text-[var(--ink-2)] md:text-base">
                    {s.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
