'use client'

import { useEffect } from 'react'
import { destroySmoothScroll, initSmoothScroll, prefersReducedMotion } from '@/lib/scroll'
import ScrollProgress from '@/components/ScrollProgress'
import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import Positioning from '@/sections/Positioning'
import Services from '@/sections/Services'
import SelectedWork from '@/sections/SelectedWork'
import Principles from '@/sections/Principles'
import Process from '@/sections/Process'
import TechStack from '@/sections/TechStack'
import About from '@/sections/About'
import FinalCTA from '@/sections/FinalCTA'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'
import { ScrollTrigger } from '@/lib/scroll'

export default function Home() {
  useEffect(() => {
    if (prefersReducedMotion()) document.documentElement.classList.add('reduced-motion')
    initSmoothScroll()

    // Ensure ScrollTrigger measures correctly after fonts/images settle
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    if (document.fonts) document.fonts.ready.then(onLoad).catch(() => {})

    return () => {
      window.removeEventListener('load', onLoad)
      destroySmoothScroll()
    }
  }, [])

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Positioning />
        <Services />
        <SelectedWork />
        <Principles />
        <Process />
        <TechStack />
        <About />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
