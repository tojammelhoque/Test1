import { useCallback, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/scroll'
import { projects, type Project } from '@/lib/data'
import BrowserMockup from '@/components/BrowserMockup'
import CaseStudyModal from '@/components/CaseStudyModal'

const CLIP_HIDDEN = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
const CLIP_SHOWN = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

export default function SelectedWork() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState<Project | null>(null)
  const [reduced] = useState(() => prefersReducedMotion())
  const close = useCallback(() => setActive(null), [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const reduced = prefersReducedMotion()

      mm.add('(min-width: 1024px)', () => {
        const texts = gsap.utils.toArray<HTMLElement>('[data-work-text]')
        const shots = gsap.utils.toArray<HTMLElement>('[data-work-shot]')
        const nums = gsap.utils.toArray<HTMLElement>('[data-work-num]')

        // Initial states: first project visible, rest hidden
        texts.forEach((el, i) =>
          gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40, pointerEvents: i === 0 ? 'auto' : 'none' }),
        )
        shots.forEach((el, i) =>
          gsap.set(el, { clipPath: i === 0 ? CLIP_SHOWN : CLIP_HIDDEN }),
        )
        nums.forEach((el, i) => gsap.set(el, { opacity: i === 0 ? 1 : 0.18 }))
        gsap.set('[data-work-progress]', { scaleX: 1 / projects.length })

        if (reduced) return

        const n = projects.length
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: '[data-work-pin]',
            start: 'top top',
            end: `+=${(n - 1) * 100}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })

        for (let i = 1; i < n; i++) {
          const at = (i - 1) * 1.2 + 0.55 // gap before each transition
          tl.to(texts[i - 1], { opacity: 0, y: -40, duration: 0.4 }, at)
            .set(texts[i - 1], { pointerEvents: 'none' }, at)
            .set(texts[i], { pointerEvents: 'auto' }, at + 0.15)
            .fromTo(texts[i], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45 }, at + 0.15)
            .to(shots[i], { clipPath: CLIP_SHOWN, duration: 0.7, ease: 'power3.inOut' }, at)
            .to(nums[i - 1], { opacity: 0.18, duration: 0.2 }, at)
            .to(nums[i], { opacity: 1, duration: 0.2 }, at + 0.15)
            .to('[data-work-progress]', { scaleX: (i + 1) / n, duration: 0.6, ease: 'none' }, at)
        }
      })

      mm.add('(max-width: 1023px)', () => {
        if (reduced) return
        gsap.utils.toArray<HTMLElement>('[data-work-card]').forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%' },
            },
          )
        })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="work" aria-label="Selected work" className="bg-[var(--dark)] text-[#ece9e0]">
      {/* ---------- Desktop: pinned cinematic showcase ---------- */}
      <div data-work-pin className={reduced ? 'hidden' : 'hidden lg:block'}>
        <div className="flex h-screen flex-col justify-center">
          <div className="container-site">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="eyebrow eyebrow-on-dark mb-4">Selected Work</p>
                <h2 className="font-display text-[clamp(2rem,3.6vw,3.2rem)] font-medium leading-none tracking-[-0.02em]">
                  Work that <em className="font-editorial font-normal italic text-[#9db1ff]">speaks</em> for itself
                </h2>
              </div>
              {/* progress */}
              <div className="flex items-center gap-5">
                <div className="flex gap-4 font-display text-xs tracking-[0.15em]">
                  {projects.map((p) => (
                    <span key={p.id} data-work-num className="text-[#ece9e0]">
                      {p.index}
                    </span>
                  ))}
                </div>
                <div className="h-px w-28 overflow-hidden bg-white/15">
                  <div data-work-progress className="h-full w-full origin-left bg-[#9db1ff]" />
                </div>
              </div>
            </div>

            <div className="grid items-center gap-14 lg:grid-cols-12">
              {/* text stack */}
              <div className="relative h-[300px] lg:col-span-5">
                {projects.map((p) => (
                  <div key={p.id} data-work-text className="absolute inset-0 flex flex-col">
                    <p className="eyebrow eyebrow-on-dark">
                      {p.category} · {p.label}
                    </p>
                    <h3 className="font-display mt-4 text-[clamp(1.9rem,3vw,2.8rem)] font-medium tracking-[-0.02em]">
                      {p.name}
                    </h3>
                    <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#a9a599]">
                      {p.description}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {p.technologies.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium text-[#c9c5b8]"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setActive(p)}
                      className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-[#ece9e0]"
                    >
                      <span className="link-sweep">View case study</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* mockup stack */}
              <div className="relative lg:col-span-7">
                <div className="relative aspect-[16/10] w-full">
                  {projects.map((p) => (
                    <div key={p.id} data-work-shot className="absolute inset-0 will-change-[clip-path]">
                      <BrowserMockup theme={p.theme} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Mobile / tablet / reduced-motion: stacked cards ---------- */}
      <div className={`container-site py-24 ${reduced ? '' : 'lg:hidden'}`}>
        <p className="eyebrow eyebrow-on-dark mb-4">Selected Work</p>
        <h2 className="font-display text-[clamp(2rem,7vw,2.8rem)] font-medium leading-tight tracking-[-0.02em]">
          Work that <em className="font-editorial font-normal italic text-[#9db1ff]">speaks</em> for itself
        </h2>

        <div className="mt-14 flex flex-col gap-16">
          {projects.map((p) => (
            <article key={p.id} data-work-card>
              <BrowserMockup theme={p.theme} />
              <p className="eyebrow eyebrow-on-dark mt-6">
                {p.index} — {p.category} · {p.label}
              </p>
              <h3 className="font-display mt-3 text-2xl font-medium tracking-[-0.01em]">{p.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#a9a599]">{p.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.technologies.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium text-[#c9c5b8]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setActive(p)}
                className="group mt-5 inline-flex items-center gap-2 text-sm font-medium"
              >
                <span className="link-sweep">View case study</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </article>
          ))}
        </div>
      </div>

      <CaseStudyModal project={active} onClose={close} />
    </section>
  )
}
