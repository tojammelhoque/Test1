import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion, scrollToSection } from '@/lib/scroll'
import BrowserMockup from '@/components/BrowserMockup'

export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Initial states (runs pre-paint via useGSAP's layout effect)
      gsap.set('.mask-line > span', { yPercent: 110 })

      // Load choreography
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
        '.mask-line > span',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, stagger: 0.12 },
        0.15,
      )
        .fromTo(
          '[data-hero-word]',
          { opacity: 0, scale: 0.92, rotate: -2 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: 'power2.out' },
          0.75,
        )
        .fromTo(
          '[data-fade]',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
          0.55,
        )
        .fromTo(
          '[data-mockup]',
          { opacity: 0, y: 60, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
          0.6,
        )

      // Scroll: layers drift at different speeds
      gsap.to('[data-hero-copy]', {
        yPercent: -18,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to('[data-mockup]', {
        y: -40,
        scale: 0.97,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="top"
      aria-label="Introduction"
      className="relative overflow-hidden pt-28 md:pt-40"
    >
      {/* faint grid accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(23,21,18,0.035)_1px,transparent_1px)] [background-size:clamp(60px,8vw,120px)_100%]"
      />

      <div className="container-site relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div data-hero-copy className="lg:col-span-7">
            <p data-fade className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-white/60 px-4 py-2 text-xs font-medium text-[var(--ink-2)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
              </span>
              Available for new projects
            </p>

            <h1 className="font-display text-balance text-[clamp(2.6rem,7.2vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[var(--ink)]">
              <span className="mask-line">
                <span>Websites that make</span>
              </span>
              <span className="mask-line">
                <span>
                  your business look{' '}
                  <em
                    data-hero-word
                    className="font-editorial inline-block font-normal italic text-[var(--accent)]"
                  >
                    exceptional.
                  </em>
                </span>
              </span>
            </h1>

            <p
              data-fade
              className="mt-7 max-w-xl text-base leading-relaxed text-[var(--ink-2)] md:text-lg"
            >
              I design and develop modern, fast and conversion-focused websites for businesses,
              founders, coaches, consultants and growing brands.
            </p>

            <div data-fade className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#contact')
                }}
                className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--ink)] px-7 py-3.5 text-sm font-medium text-[var(--paper)] transition-colors duration-300 hover:bg-[var(--accent)]"
              >
                Start a Project
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#work')
                }}
                className="link-sweep text-sm font-medium text-[var(--ink)]"
              >
                View My Work
              </a>
            </div>
          </div>

          <div className="relative lg:col-span-5" data-mockup>
            <div className="relative lg:-mr-16 lg:translate-x-4">
              <BrowserMockup theme="nova" />
              <div
                aria-hidden="true"
                className="absolute -bottom-6 -left-6 -z-10 h-40 w-40 rounded-full border border-[var(--line)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
