import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/scroll'

export default function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '[data-about]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: 'top 78%' },
        },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} id="about" aria-label="About" className="border-t border-[var(--line)] py-24 md:py-36">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-about className="eyebrow mb-4">About</p>
          <h2 data-about className="font-display text-balance text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.06] tracking-[-0.02em]">
            Hi, I’m <em className="font-editorial font-normal italic text-[var(--accent)]">Tojammel.</em>
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p data-about className="text-lg leading-relaxed text-[var(--ink)] md:text-xl">
            Full-Stack Web Developer focused on building modern websites and web applications for
            businesses, founders and growing brands.
          </p>
          <p data-about className="mt-6 text-sm leading-relaxed text-[var(--ink-2)] md:text-base">
            I work across the whole stack — frontend, backend, modern UI, responsive design and
            performance — but the starting point is always the same: your business. A website
            should earn its place by communicating clearly, loading fast and converting visitors
            into customers. That’s what I build.
          </p>
          <ul data-about className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {['Frontend development', 'Backend development', 'Modern UI', 'Responsive design', 'Performance', 'Business-focused thinking'].map(
              (item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--ink-2)]">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
