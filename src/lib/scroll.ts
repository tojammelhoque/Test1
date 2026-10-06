import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null
let tickerFn: ((time: number) => void) | null = null

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initSmoothScroll(): Lenis | null {
  if (lenis || prefersReducedMotion()) {
    if (prefersReducedMotion()) document.documentElement.classList.add('reduced-motion')
    return lenis
  }
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  tickerFn = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tickerFn)
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function destroySmoothScroll() {
  if (tickerFn) gsap.ticker.remove(tickerFn)
  tickerFn = null
  lenis?.destroy()
  lenis = null
}

export function scrollToSection(selector: string) {
  const el = document.querySelector(selector)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.4 })
  } else {
    ;(el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function stopScroll() {
  lenis?.stop()
  document.body.style.overflow = 'hidden'
}

export function startScroll() {
  lenis?.start()
  document.body.style.overflow = ''
}

export { gsap, ScrollTrigger }
