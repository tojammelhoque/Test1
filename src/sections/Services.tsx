import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/scroll'
import { services } from '@/lib/data'

export default function Services() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '[data-service]',
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '[data-service-grid]', start: 'top 80%' },
        },
      )
      gsap.fromTo(
        '[data-services-head]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 78%' },
        },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} id="services" aria-label="Services" className="border-t border-[var(--line)] py-24 md:py-36">
      <div className="container-site">
        <div data-services-head className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4">Services</p>
            <h2 className="font-display text-balance text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
              What I can build <em className="font-editorial font-normal italic text-[var(--accent)]">for you</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--ink-2)]">
            Every engagement is scoped around one thing: what your website needs to achieve for
            your business.
          </p>
        </div>

        <div data-service-grid className="grid gap-px overflow-hidden rounded-xl bg-[var(--line)] ring-1 ring-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.index}
              data-service
              className="group relative bg-[var(--paper)] p-8 transition-colors duration-500 hover:bg-white md:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-xs font-medium tracking-[0.15em] text-[var(--ink-3)] transition-colors duration-500 group-hover:text-[var(--accent)]">
                  {s.index}
                </span>
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[var(--line)] transition-colors duration-500 group-hover:bg-[var(--accent)]"
                />
              </div>
              <h3 className="font-display mt-10 text-xl font-medium tracking-[-0.01em] md:mt-14">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-2)]">{s.description}</p>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
