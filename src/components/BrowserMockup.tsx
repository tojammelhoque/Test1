import type { MockupTheme } from '@/lib/data'

/**
 * Code-drawn "website inside a browser" mockups.
 * Each theme is a miniature premium website design — pure DOM, no images.
 */

function Chrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_24px_60px_-24px_rgba(23,21,18,0.35)] ring-1 ring-black/10">
      <div className="flex items-center gap-2 border-b border-black/[0.07] bg-[#f3f2ee] px-3 py-2">
        <span className="flex gap-1.5">
          <i className="h-2 w-2 rounded-full bg-[#d8d4cb]" />
          <i className="h-2 w-2 rounded-full bg-[#d8d4cb]" />
          <i className="h-2 w-2 rounded-full bg-[#d8d4cb]" />
        </span>
        <span className="mx-auto flex items-center gap-1.5 rounded-md bg-white px-6 py-0.5 text-[8px] font-medium tracking-wide text-[#8a867c] ring-1 ring-black/[0.06]">
          {url}
        </span>
        <span className="w-8" />
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  )
}

function Nova() {
  return (
    <Chrome url="novastudio.co">
      <div className="flex h-full flex-col bg-[#141f19] p-[6%] text-[#ece9e0]">
        <div className="flex items-center justify-between">
          <span className="font-display text-[10px] font-semibold tracking-[0.2em]">NOVA</span>
          <span className="flex gap-3 text-[6px] tracking-[0.18em] text-[#8fa398]">
            <span>WORK</span>
            <span>STUDIO</span>
            <span>CONTACT</span>
          </span>
        </div>
        <div className="mt-[10%]">
          <p className="text-[6px] uppercase tracking-[0.3em] text-[#7d917f]">Creative studio — Est. 2019</p>
          <h3 className="font-editorial mt-2 text-[26px] leading-[1.05]">
            Ideas that <em className="text-[#a8c5ad]">move</em>
            <br />
            culture forward.
          </h3>
          <p className="mt-3 max-w-[55%] text-[7px] leading-relaxed text-[#9aa89d]">
            Brand, digital and motion for companies that refuse to be ignored.
          </p>
        </div>
        <div className="mt-auto grid grid-cols-3 gap-2">
          {['#233528', '#2e4534', '#3a5a42'].map((c, i) => (
            <div key={i} className="rounded-sm p-2" style={{ background: c }}>
              <div className="h-6 rounded-sm bg-white/[0.08]" />
              <div className="mt-1.5 h-1 w-2/3 rounded-full bg-white/25" />
              <div className="mt-1 h-1 w-1/3 rounded-full bg-white/15" />
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  )
}

function Auralis() {
  return (
    <Chrome url="auralis.io">
      <div className="flex h-full bg-[#f7f9fc]">
        <div className="flex w-[22%] flex-col gap-2 border-r border-[#e3e9f2] bg-white p-[4%]">
          <span className="font-display text-[9px] font-semibold tracking-[0.15em] text-[#1b3a5c]">AURALIS</span>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-1.5 rounded-full ${i === 0 ? 'bg-[#2447e0]' : 'bg-[#dfe6f0]'}`} style={{ width: `${70 - i * 12}%` }} />
          ))}
        </div>
        <div className="flex-1 p-[4%]">
          <p className="text-[6px] uppercase tracking-[0.25em] text-[#7b8aa0]">Analytics overview</p>
          <h3 className="font-display mt-1 text-[15px] font-semibold leading-tight text-[#16283d]">
            Understand your product, finally.
          </h3>
          <div className="mt-3 rounded-md bg-white p-2.5 ring-1 ring-[#e3e9f2]">
            <div className="flex items-end gap-1.5" style={{ height: 44 }}>
              {[38, 62, 45, 78, 55, 90, 70, 96].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{ height: `${h}%`, background: i === 7 ? '#2447e0' : '#c9d6ea' }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between">
              <div className="h-1 w-10 rounded-full bg-[#e3e9f2]" />
              <div className="h-1 w-6 rounded-full bg-[#2447e0]/30" />
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-md bg-white p-2 ring-1 ring-[#e3e9f2]">
                <div className="h-1 w-3/4 rounded-full bg-[#dfe6f0]" />
                <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-[#16283d]/70" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  )
}

function Meridian() {
  return (
    <Chrome url="meridiancoaching.com">
      <div className="flex h-full flex-col items-center bg-[#f4efe7] p-[6%] text-center text-[#3a2e21]">
        <span className="font-editorial text-[11px] tracking-[0.12em]">Meridian</span>
        <div className="mt-1 h-px w-8 bg-[#b09373]" />
        <p className="mt-[8%] text-[6px] uppercase tracking-[0.3em] text-[#a08a70]">Executive coaching</p>
        <h3 className="font-editorial mt-2 text-[21px] leading-[1.15]">
          Lead with <em className="text-[#8f6b48]">clarity</em>,
          <br />
          not noise.
        </h3>
        <p className="mt-3 max-w-[70%] text-[7px] leading-relaxed text-[#8a7a64]">
          One-to-one coaching for founders and executives navigating their next chapter.
        </p>
        <span className="mt-4 rounded-full border border-[#3a2e21] px-4 py-1 text-[6px] uppercase tracking-[0.2em]">
          Book a call
        </span>
        <div className="mt-auto flex w-full items-end justify-between">
          <div className="h-1 w-14 rounded-full bg-[#d8ccb9]" />
          <div className="h-1 w-8 rounded-full bg-[#d8ccb9]" />
        </div>
      </div>
    </Chrome>
  )
}

function Atlas() {
  return (
    <Chrome url="atlasproperties.co">
      <div className="flex h-full flex-col bg-white">
        <div className="flex items-center justify-between bg-[#243026] px-[5%] py-2.5 text-[#eef2ec]">
          <span className="font-display text-[9px] font-semibold tracking-[0.18em]">ATLAS</span>
          <span className="rounded-full bg-[#c8a24a] px-3 py-0.5 text-[6px] font-medium tracking-[0.15em] text-[#243026]">
            VIEW LISTINGS
          </span>
        </div>
        <div className="flex flex-1 flex-col p-[5%]">
          <p className="text-[6px] uppercase tracking-[0.25em] text-[#8a9187]">Property, done properly</p>
          <h3 className="font-display mt-1 text-[16px] font-semibold leading-tight text-[#243026]">
            Find the space your business deserves.
          </h3>
          <div className="mt-3 grid flex-1 grid-cols-3 gap-2">
            {['#e7e4dc', '#dde3da', '#e3ddd0'].map((c, i) => (
              <div key={i} className="flex flex-col overflow-hidden rounded-sm ring-1 ring-black/[0.06]">
                <div className="flex-1" style={{ background: c }}>
                  <div className="m-1.5 h-1 w-1/2 rounded-full bg-black/10" />
                  <div className="m-1.5 mt-1 h-1 w-1/3 rounded-full bg-black/[0.06]" />
                </div>
                <div className="bg-white p-1.5">
                  <div className="h-1 w-2/3 rounded-full bg-[#243026]/60" />
                  <div className="mt-1 h-1 w-1/3 rounded-full bg-[#c8a24a]/70" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  )
}

const themes: Record<MockupTheme, () => React.ReactElement> = {
  nova: Nova,
  auralis: Auralis,
  meridian: Meridian,
  atlas: Atlas,
}

export default function BrowserMockup({ theme }: { theme: MockupTheme }) {
  const Inner = themes[theme]
  return (
    <div className="aspect-[16/10] w-full select-none" aria-hidden="true">
      <Inner />
    </div>
  )
}
