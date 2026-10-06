import { useEffect } from 'react'
import type { Project } from '@/lib/data'
import { startScroll, stopScroll } from '@/lib/scroll'

export default function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!project) return
    stopScroll()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      startScroll()
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  if (!project) return null

  const rows: { title: string; body: React.ReactNode }[] = [
    { title: 'Challenge', body: project.caseStudy.challenge },
    { title: 'Approach', body: project.caseStudy.approach },
    { title: 'Solution', body: project.caseStudy.solution },
    {
      title: 'Technology',
      body: (
        <ul className="flex flex-wrap gap-2">
          {project.caseStudy.technology.map((t) => (
            <li
              key={t}
              className="rounded-full border border-[var(--line)] px-3.5 py-1.5 text-xs font-medium text-[var(--ink-2)]"
            >
              {t}
            </li>
          ))}
        </ul>
      ),
    },
    { title: 'Outcome', body: project.caseStudy.outcome },
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
      className="fixed inset-0 z-[80] flex items-end justify-center md:items-center md:p-8"
    >
      <button
        aria-label="Close case study"
        onClick={onClose}
        className="absolute inset-0 bg-[#141310]/60 backdrop-blur-sm"
      />
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-[var(--paper)] shadow-2xl md:rounded-2xl">
        <div className="flex items-start justify-between gap-6 border-b border-[var(--line)] p-6 md:p-8">
          <div>
            <p className="eyebrow mb-2">
              {project.index} — {project.category} · {project.label}
            </p>
            <h3 className="font-display text-2xl font-medium tracking-[-0.01em] md:text-3xl">
              {project.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-2)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            ✕
          </button>
        </div>
        <div data-lenis-prevent className="overflow-y-auto p-6 md:p-8">
          <dl className="flex flex-col gap-8">
            {rows.map((r) => (
              <div key={r.title} className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-6">
                <dt className="font-display text-xs font-medium uppercase tracking-[0.18em] text-[var(--ink-3)]">
                  {r.title}
                </dt>
                <dd className="text-sm leading-relaxed text-[var(--ink-2)]">{r.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
