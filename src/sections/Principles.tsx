import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/scroll'
import { principles } from '@/lib/data'

export default function Principles() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '[data-principle]',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '[data-principles-list]', start: 'top 80%' },
        },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-label="Why work with me" className="border-t border-[var(--line)] py-24 md:py-36">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-4">Why Work With Me</p>
          <h2 className="font-display text-balance text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.06] tracking-[-0.02em]">
            More than just{' '}
            <em className="font-editorial font-normal italic">development.</em>
          </h2>
        </div>

        <div data-principles-list className="lg:col-span-8">
          <dl className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.index} data-principle className="border-t border-[var(--line)] pt-6">
                <dt className="flex items-baseline gap-4">
                  <span className="font-display text-xs font-medium tracking-[0.15em] text-[var(--accent)]">
                    {p.index}
                  </span>
                  <span className="font-display text-xl font-medium tracking-[-0.01em]">{p.title}</span>
                </dt>
                <dd className="mt-3 pl-9 text-sm leading-relaxed text-[var(--ink-2)]">
                  {p.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
