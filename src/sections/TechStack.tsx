import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/scroll'
import { techStack } from '@/lib/data'

export default function TechStack() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '[data-tech]',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.05,
          scrollTrigger: { trigger: root.current, start: 'top 82%' },
        },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-label="Technology" className="border-t border-[var(--line)] py-24 md:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-4">Technology</p>
          <h2 className="font-display text-balance text-[clamp(1.8rem,3.4vw,2.7rem)] font-medium leading-[1.08] tracking-[-0.02em]">
            Built with modern technology
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--ink-2)]">
            The stack is chosen for speed, reliability and maintainability — so your site stays
            fast and easy to evolve long after launch.
          </p>
        </div>
        <ul className="flex flex-wrap content-start gap-3 lg:col-span-8">
          {techStack.map((t) => (
            <li
              key={t}
              data-tech
              className="font-display rounded-full border border-[var(--line)] bg-white/50 px-5 py-2.5 text-sm font-medium text-[var(--ink-2)] transition-colors duration-300 hover:border-[var(--ink)] hover:text-[var(--ink)]"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
