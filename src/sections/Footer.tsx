import { contact } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--dark-line)] bg-[var(--dark)] py-12 text-[#ece9e0]">
      <div className="container-site flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.22em]">TOJAMMEL HOQUE</p>
          <p className="mt-2 text-sm text-[#a9a599]">Full-Stack Web Developer</p>
          <p className="mt-1 text-sm text-[#7d796e]">Building modern websites for ambitious businesses.</p>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <ul className="flex gap-6">
            {[
              { label: 'LinkedIn', href: contact.linkedin.href },
              { label: 'GitHub', href: contact.github.href },
              { label: 'Email', href: `mailto:${contact.email}` },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="link-sweep text-sm text-[#c9c5b8] transition-colors hover:text-[#ece9e0]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[#7d796e]">© 2026 Tojammel Hoque. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
