import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion, scrollToSection } from '@/lib/scroll'

export default function FinalCTA() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.set('.mask-line > span', { yPercent: 110 })
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
        defaults: { ease: 'power3.out' },
      })
      tl.fromTo(
        '.mask-line > span',
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.12 },
      ).fromTo(
        '[data-cta-fade]',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        0.4,
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-label="Start a project" className="bg-[var(--dark)] py-28 text-[#ece9e0] md:py-44">
      <div className="container-site text-center">
        <p data-cta-fade className="eyebrow eyebrow-on-dark mb-8">Ready when you are</p>
        <h2 className="font-display mx-auto max-w-4xl text-balance text-[clamp(2.4rem,6.5vw,5rem)] font-medium leading-[1.03] tracking-[-0.03em]">
          <span className="mask-line">
            <span>Have a website</span>
          </span>
          <span className="mask-line">
            <span>
              in <em className="font-editorial font-normal italic text-[#9db1ff]">mind?</em>
            </span>
          </span>
        </h2>
        <p data-cta-fade className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-[#a9a599]">
          Tell me what you’re building. I’ll help you turn the idea into a modern website that
          represents your business properly.
        </p>
        <div data-cta-fade className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#contact')
            }}
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#ece9e0] px-8 py-4 text-sm font-medium text-[var(--dark)] transition-colors duration-300 hover:bg-[#9db1ff]"
          >
            Start a Conversation
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#work')
            }}
            className="link-sweep text-sm font-medium text-[#ece9e0]"
          >
            View My Work
          </a>
        </div>
      </div>
    </section>
  )
}
