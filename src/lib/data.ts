export type MockupTheme = 'nova' | 'auralis' | 'meridian' | 'atlas'

export interface Project {
  id: string
  index: string
  name: string
  category: string
  label: string
  description: string
  technologies: string[]
  theme: MockupTheme
  themeColor: string
  caseStudy: {
    challenge: string
    approach: string
    solution: string
    technology: string[]
    outcome: string
  }
}

export const projects: Project[] = [
  {
    id: 'nova-studio',
    index: '01',
    name: 'Nova Studio',
    category: 'Creative Agency Website',
    label: 'Concept Project',
    description:
      'A modern agency website designed to communicate expertise clearly and turn visits into qualified enquiries.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    theme: 'nova',
    themeColor: '#1c2b22',
    caseStudy: {
      challenge:
        'Creative agencies often bury their value under generic visuals. The goal was a site where positioning and craft are obvious within seconds of landing.',
      approach:
        'Structured the page as a single editorial flow: positioning statement, selected work, services, then a direct call to action. Wireframes prioritised scanning behaviour — headline first, proof second, contact always one scroll away.',
      solution:
        'A dark, typography-led design with oversized display headlines, generous whitespace and a scroll-driven project showcase. Built as a fully responsive single-page experience with smooth scrolling and restrained motion.',
      technology: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Node.js'],
      outcome:
        'Concept project — built to demonstrate how a premium agency site should feel: confident, fast and focused on generating enquiries rather than decoration.',
    },
  },
  {
    id: 'auralis',
    index: '02',
    name: 'Auralis',
    category: 'SaaS Product Website',
    label: 'Concept Project',
    description:
      'A product website that explains a complex analytics platform in plain language, structured around a conversion-focused user journey.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    theme: 'auralis',
    themeColor: '#1b3a5c',
    caseStudy: {
      challenge:
        'Technical SaaS products are hard to explain. Visitors need to understand what the product does, who it is for, and why it matters — before they lose interest.',
      approach:
        'Mapped the page to the questions a buyer asks in order: What is it? How does it help me? Can I trust it? What does it cost? Each section answers exactly one question, in plain language, with interface mockups instead of jargon.',
      solution:
        'A light, precise layout with product UI mockups, a feature narrative told through real interface states, and a pricing section designed for clarity rather than dark patterns.',
      technology: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL'],
      outcome:
        'Concept project — built to demonstrate how complex products can be presented simply, with structure and typography doing the persuading.',
    },
  },
  {
    id: 'meridian',
    index: '03',
    name: 'Meridian Coaching',
    category: 'Personal Brand Website',
    label: 'Concept Project',
    description:
      'A premium personal brand site for an executive coach — warm, credible, and built to convert visitors into booked calls.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'],
    theme: 'meridian',
    themeColor: '#6b4f35',
    caseStudy: {
      challenge:
        'Coaches and consultants sell trust. A template site undermines the very premium positioning they charge for — the website itself must feel like the service.',
      approach:
        'Designed around a warm editorial aesthetic: serif accents, generous spacing, and a clear path from story to services to booking. The tone is personal without being informal.',
      solution:
        'A responsive site with an editorial hero, a story section that builds credibility, clearly packaged offers, and a frictionless booking call-to-action repeated at key decision points.',
      technology: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'],
      outcome:
        'Concept project — built to demonstrate how a personal brand can be presented with the same polish as a boutique studio.',
    },
  },
  {
    id: 'atlas',
    index: '04',
    name: 'Atlas Properties',
    category: 'Business Website',
    label: 'Concept Project',
    description:
      'A complete redesign turning an outdated property firm website into a modern, responsive experience that builds immediate credibility.',
    technologies: ['React', 'Node.js', 'Express', 'Docker'],
    theme: 'atlas',
    themeColor: '#243026',
    caseStudy: {
      challenge:
        'The existing site looked a decade old: slow, broken on mobile, and quietly costing the firm enquiries every week. First impressions were actively working against the business.',
      approach:
        'Rebuilt the information architecture around what visitors actually look for — listings, credibility signals, and contact — and designed a mobile-first layout, since most property searches start on a phone.',
      solution:
        'A clean redesign with fast-loading listing pages, clear trust signals, and a contact flow that takes under a minute. Fully responsive from small phones to large desktop screens.',
      technology: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
      outcome:
        'Concept project — built to demonstrate how a dated business website can be transformed into a modern, credible, responsive experience.',
    },
  },
]

export const services = [
  {
    index: '01',
    title: 'Business Websites',
    description:
      'Modern websites designed to establish credibility and generate enquiries for your business.',
  },
  {
    index: '02',
    title: 'Landing Pages',
    description:
      'High-converting landing pages for products, services and campaigns — built to persuade.',
  },
  {
    index: '03',
    title: 'Personal Brand Websites',
    description:
      'Premium websites for coaches, consultants, creators and professionals who sell trust.',
  },
  {
    index: '04',
    title: 'SaaS / Startup Websites',
    description:
      'Product websites designed to explain complex products simply and move visitors to action.',
  },
  {
    index: '05',
    title: 'Website Redesign',
    description:
      'Transform an outdated website into a modern, responsive experience that works for your business.',
  },
  {
    index: '06',
    title: 'Full-Stack Web Applications',
    description:
      'Custom web applications with modern frontend and backend architecture, built to last.',
  },
]

export const principles = [
  {
    index: '01',
    title: 'Business First',
    description:
      'Every design decision supports a business goal. A beautiful website that doesn’t convert is a cost, not an asset.',
  },
  {
    index: '02',
    title: 'Clean, Modern Design',
    description:
      'Professional websites without unnecessary complexity. Restraint is what makes a site feel expensive.',
  },
  {
    index: '03',
    title: 'Built To Perform',
    description:
      'Fast, responsive and technically solid — because speed and reliability are part of how your business is judged.',
  },
  {
    index: '04',
    title: 'Clear Communication',
    description:
      'Simple, direct communication from the first conversation to launch. You always know where things stand.',
  },
]

export const processSteps = [
  {
    index: '01',
    title: 'Discovery',
    description: 'Understand your business, your audience and your goals.',
  },
  {
    index: '02',
    title: 'Strategy',
    description: 'Plan the website structure, content and user journey.',
  },
  {
    index: '03',
    title: 'Design',
    description: 'Create the visual direction and the interface.',
  },
  {
    index: '04',
    title: 'Development',
    description: 'Build the responsive website and its functionality.',
  },
  {
    index: '05',
    title: 'Launch',
    description: 'Test, optimise and deploy — then hand you the keys.',
  },
]

export const techStack = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'Express',
  'MongoDB',
  'PostgreSQL',
  'Docker',
]

export const contact = {
  email: 'contact@tojammelhoque.com',
  linkedin: { label: 'linkedin.com/in/tojammelhoque', href: 'https://www.linkedin.com/in/tojammelhoque' },
  github: { label: 'github.com/tojammelhoque', href: 'https://github.com/tojammelhoque' },
}
