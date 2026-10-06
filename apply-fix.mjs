// apply-fix.mjs
// Run from your project root (the folder with package.json):   node apply-fix.mjs
// Safe to run twice. It only edits a file when it finds the exact text to fix,
// and it keeps your Windows (CRLF) line endings.
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const done = []
const skipped = []
const exists = (p) => fs.existsSync(p)
const read = (p) => fs.readFileSync(p, 'utf8')
const eolOf = (s) => (s.includes('\r\n') ? '\r\n' : '\n')

function save(file, before, after, why) {
  if (after === before) return
  fs.writeFileSync(file, after)
  done.push(`${file} -- ${why}`)
}

function walk(dir, out = []) {
  if (!exists(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (/\.(tsx?|jsx?)$/.test(e.name)) out.push(p)
  }
  return out
}

// Replace text pairs in one file. All pairs must be found, otherwise the file is left alone.
function patch(file, pairs, why) {
  if (!exists(file)) return
  const s = read(file)
  const found = pairs.filter(([a]) => s.includes(a)).length
  if (found === 0) return // already fixed, or different code
  if (found !== pairs.length) {
    skipped.push(`${file} -- differs from GitHub version, fix by hand: ${why}`)
    return
  }
  let out = s
  for (const [a, b] of pairs) out = out.split(a).join(b)
  save(file, s, out, why)
}

if (!exists('package.json') || !/"next"/.test(read('package.json'))) {
  console.error('Run this from your project root (the folder that has package.json).')
  process.exit(1)
}

// 1) BUILD FIX: Tailwind v4-only --spacing() in shadcn files (project uses Tailwind v3)
for (const f of walk('src')) {
  const s = read(f)
  if (!s.includes('--spacing(')) continue
  const out = s
    .split('gap-[--spacing(var(--gap))]').join('gap-[calc(var(--gap)*0.25rem)]')
    .replace(/\(--spacing\((\d+(?:\.\d+)?)\)\)/g, (_, n) => `${n / 4}rem`)
    .replace(/--spacing\((\d+(?:\.\d+)?)\)/g, (_, n) => `${n / 4}rem`)
  save(f, s, out, 'Tailwind v4 --spacing() -> v3 value (this broke "next build")')
}
for (const f of walk('src')) {
  if (read(f).includes('--spacing(')) skipped.push(`${f} -- still has --spacing(...), replace by hand`)
}

// 2) tailwind.config.js: CommonJS inside an ESM package -> ESM
if (exists('tailwind.config.js') && /"type"\s*:\s*"module"/.test(read('package.json'))) {
  const s = read('tailwind.config.js')
  if (s.includes('module.exports')) {
    const eol = eolOf(s)
    let out = s.replace('module.exports =', 'export default')
    out = out.replace(/require\((["'])tailwindcss-animate\1\)/, 'animate')
    if (/require\(/.test(out)) {
      skipped.push('tailwind.config.js -- has other require() calls, convert to ESM by hand')
    } else {
      if (out.includes('animate') && !out.includes('import animate')) {
        out = `import animate from "tailwindcss-animate"${eol}${eol}` + out
      }
      save('tailwind.config.js', s, out, 'CommonJS -> ESM (removes the build warning)')
    }
  }
}

// 3) /Home route: src/pages is Next's Pages Router folder
{
  const dir = 'src/pages'
  const home = path.join(dir, 'Home.tsx')
  if (exists(home)) {
    if (fs.readdirSync(dir).length === 1 && exists('src/app') && !exists('src/views/Home.tsx')) {
      fs.mkdirSync('src/views', { recursive: true })
      fs.renameSync(home, 'src/views/Home.tsx')
      fs.rmdirSync(dir)
      for (const f of walk('src')) {
        const s = read(f)
        if (s.includes('@/pages/Home')) save(f, s, s.split('@/pages/Home').join('@/views/Home'), 'import path')
      }
      done.push('src/pages/Home.tsx -> src/views/Home.tsx (src/pages was publishing an unstyled copy of the site at /Home)')
    } else {
      skipped.push('src/pages -- move Home.tsx out of src/pages (it becomes a public /Home route)')
    }
  }
  for (const f of walk('src')) {
    if (/pages\/Home/.test(read(f))) skipped.push(`${f} -- still imports pages/Home, update the path`)
  }
}

// 4) Lint: random skeleton width in sidebar.tsx
{
  const f = 'src/components/ui/sidebar.tsx'
  if (exists(f)) {
    const s = read(f)
    if (s.includes('Math.random()') && !s.includes('react-hooks/purity')) {
      const eol = eolOf(s)
      const out = s.replace(
        /^([ \t]*)(return `\$\{Math\.floor\(Math\.random\(\))/m,
        `$1// eslint-disable-next-line react-hooks/purity -- decorative skeleton width${eol}$1$2`,
      )
      save(f, s, out, 'lint error (Math.random during render)')
    }
  }
}

// 5) Modal could not scroll while smooth-scroll (Lenis) is stopped
patch(
  'src/components/CaseStudyModal.tsx',
  [['<div className="overflow-y-auto p-6 md:p-8">', '<div data-lenis-prevent className="overflow-y-auto p-6 md:p-8">']],
  'case-study modal can scroll again (data-lenis-prevent)',
)

// 6) Reduced-motion users only saw project 01 (hydration mismatch) -> CSS variants
{
  const f = 'src/sections/SelectedWork.tsx'
  if (exists(f)) {
    const s = read(f)
    const stateLine = /^[ \t]*const \[reduced\] = useState\(\(\) => prefersReducedMotion\(\)\)\r?\n/m
    const a = "className={reduced ? 'hidden' : 'hidden lg:block'}"
    const b = "className={`container-site py-24 ${reduced ? '' : 'lg:hidden'}`}"
    const hits = [stateLine.test(s), s.includes(a), s.includes(b)].filter(Boolean).length
    if (hits === 3) {
      const out = s
        .replace(stateLine, '')
        .split(a).join('className="hidden lg:block motion-reduce:lg:hidden"')
        .split(b).join('className="container-site py-24 lg:hidden motion-reduce:lg:block"')
      save(f, s, out, 'reduced-motion layout no longer breaks hydration')
    } else if (hits > 0) {
      skipped.push(`${f} -- differs from GitHub version, reduced-motion fix not applied`)
    }
  }
}

// 7) Placeholder contact details -> your real ones
patch('src/sections/Contact.tsx', [
  ["const EMAIL = 'hello@tojammel.dev'", "const EMAIL = 'contact@tojammelhoque.com'"],
  [
    "{ label: 'LinkedIn', value: 'linkedin.com/in/tojammel', href: 'https://www.linkedin.com/' }",
    "{ label: 'LinkedIn', value: 'linkedin.com/in/tojammelhoque', href: 'https://www.linkedin.com/in/tojammelhoque' }",
  ],
  [
    "{ label: 'GitHub', value: 'github.com/tojammel', href: 'https://github.com/' }",
    "{ label: 'GitHub', value: 'github.com/tojammelhoque', href: 'https://github.com/tojammelhoque' }",
  ],
], 'real email / LinkedIn / GitHub')
patch('src/sections/Footer.tsx', [
  ["{ label: 'LinkedIn', href: 'https://www.linkedin.com/' }", "{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/tojammelhoque' }"],
  ["{ label: 'GitHub', href: 'https://github.com/' }", "{ label: 'GitHub', href: 'https://github.com/tojammelhoque' }"],
  ["{ label: 'Email', href: 'mailto:hello@tojammel.dev' }", "{ label: 'Email', href: 'mailto:contact@tojammelhoque.com' }"],
], 'real email / LinkedIn / GitHub')

// 8) Sitemap / robots placeholders
patch('public/sitemap.xml', [['https://example.com/', 'https://tojammelhoque.com/']], 'sitemap domain')
if (exists('public/robots.txt')) {
  const s = read('public/robots.txt')
  if (!/^Sitemap:/im.test(s)) {
    const eol = eolOf(s)
    save('public/robots.txt', s, s.replace(/\s*$/, '') + eol + eol + 'Sitemap: https://tojammelhoque.com/sitemap.xml' + eol, 'sitemap line')
  }
}

// 9) Stop tracking build output in git, delete stale .next
{
  const f = '.gitignore'
  const s = exists(f) ? read(f) : ''
  if (!/^\/?\.next\/?\s*$/m.test(s)) {
    const eol = eolOf(s || '\n')
    const block = ['# Next.js', '/.next/', '/out/', 'next-env.d.ts', '*.tsbuildinfo', '.vercel', '.env*.local'].join(eol) + eol
    const sep = s === '' || s.endsWith('\n') ? '' : eol
    fs.writeFileSync(f, s + sep + (s ? eol : '') + block)
    done.push('.gitignore -- ignore .next, next-env.d.ts, etc.')
  }
  try {
    const tracked = execSync('git ls-files .next next-env.d.ts', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    if (tracked) {
      execSync('git rm -r -q -f --cached --ignore-unmatch .next next-env.d.ts', { stdio: 'ignore' })
      done.push('git -- stopped tracking .next and next-env.d.ts')
    }
  } catch {
    // not a git repo: nothing to do
  }
  if (exists('.next')) {
    fs.rmSync('.next', { recursive: true, force: true })
    done.push('.next -- deleted old build cache (safe, it is recreated)')
  }
}

console.log('\nChanges made:')
if (done.length === 0) console.log('  (nothing needed changing)')
for (const d of done) console.log('  [fixed] ' + d)
if (skipped.length) {
  console.log('\nNeeds a manual look:')
  for (const d of skipped) console.log('  [check] ' + d)
}
console.log('\nNext: npm run build')
