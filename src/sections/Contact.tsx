import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/scroll'

const EMAIL = 'hello@tojammel.dev'

const inputCls =
  'w-full border-b border-[var(--line)] bg-transparent py-3.5 text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-3)] focus:border-[var(--accent)] focus:outline-none transition-colors duration-300'

export default function Contact() {
  const root = useRef<HTMLElement>(null)
  const [sent, setSent] = useState(false)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '[data-contact]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: 'top 78%' },
        },
      )
    },
    { scope: root },
  )

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = `Project enquiry from ${f.get('name')}`
    const body = [
      `Name: ${f.get('name')}`,
      `Email: ${f.get('email')}`,
      `Business / Company: ${f.get('company')}`,
      `What do you need: ${f.get('need')}`,
      `Budget range: ${f.get('budget')}`,
      '',
      String(f.get('message') ?? ''),
    ].join('\n')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section ref={root} id="contact" aria-label="Contact" className="border-t border-[var(--line)] py-24 md:py-36">
      <div className="container-site grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-contact className="eyebrow mb-4">Contact</p>
          <h2 data-contact className="font-display text-balance text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.06] tracking-[-0.02em]">
            Let’s build it{' '}
            <em className="font-editorial font-normal italic text-[var(--accent)]">together.</em>
          </h2>
          <p data-contact className="mt-5 max-w-md text-sm leading-relaxed text-[var(--ink-2)] md:text-base">
            Tell me a little about your project and I’ll get back to you within one business day.
            No pressure, no obligation — just a straightforward conversation about what you need.
          </p>

          <ul data-contact className="mt-10 flex flex-col gap-4">
            {[
              { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
              { label: 'LinkedIn', value: 'linkedin.com/in/tojammel', href: 'https://www.linkedin.com/' },
              { label: 'GitHub', value: 'github.com/tojammel', href: 'https://github.com/' },
            ].map((c) => (
              <li key={c.label} className="flex items-baseline gap-4">
                <span className="w-20 font-display text-xs font-medium uppercase tracking-[0.18em] text-[var(--ink-3)]">
                  {c.label}
                </span>
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="link-sweep text-sm font-medium text-[var(--ink)]"
                >
                  {c.value}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form data-contact onSubmit={onSubmit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:col-span-7" aria-label="Project enquiry form">
          <div>
            <label htmlFor="name" className="eyebrow mb-1 block">Name</label>
            <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={inputCls} />
          </div>
          <div>
            <label htmlFor="email" className="eyebrow mb-1 block">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={inputCls} />
          </div>
          <div>
            <label htmlFor="company" className="eyebrow mb-1 block">Business / Company</label>
            <input id="company" name="company" type="text" autoComplete="organization" placeholder="Your business" className={inputCls} />
          </div>
          <div>
            <label htmlFor="need" className="eyebrow mb-1 block">What do you need?</label>
            <select id="need" name="need" required defaultValue="" className={`${inputCls} cursor-pointer`}>
              <option value="" disabled>Select one</option>
              <option>Business website</option>
              <option>Landing page</option>
              <option>Personal brand website</option>
              <option>SaaS / startup website</option>
              <option>Website redesign</option>
              <option>Full-stack web application</option>
              <option>Not sure yet</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="budget" className="eyebrow mb-1 block">Budget range</label>
            <select id="budget" name="budget" required defaultValue="" className={`${inputCls} cursor-pointer`}>
              <option value="" disabled>Select a range</option>
              <option>Under $1,000</option>
              <option>$1,000 – $3,000</option>
              <option>$3,000 – $7,000</option>
              <option>$7,000+</option>
              <option>Prefer to discuss</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="eyebrow mb-1 block">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Tell me about your project — what does your business do, and what should the website achieve?"
              className={`${inputCls} resize-none`}
            />
          </div>
          <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
            <button
              type="submit"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--ink)] px-8 py-4 text-sm font-medium text-[var(--paper)] transition-colors duration-300 hover:bg-[var(--accent)]"
            >
              Let’s Build It
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
            {sent && (
              <p role="status" className="text-sm text-[var(--ink-2)]">
                Your email app should have opened — looking forward to hearing from you.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
