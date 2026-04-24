import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const SRC = '/Users/jason/dev/pdf/makesPDF/apps/web/content/blog'
const DEST = '/Users/jason/dev/lecstor.com/content/posts'
const CANONICAL_BASE = 'https://blog.makespdf.com'

function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!m) throw new Error('no frontmatter')
  const fm = {}
  for (const line of m[1].split('\n')) {
    const mm = line.match(/^(\w+):\s*(.*)$/)
    if (!mm) continue
    let [, k, v] = mm
    v = v.trim()
    if (v.startsWith('[') && v.endsWith(']')) {
      v = v.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean)
    }
    fm[k] = v
  }
  return { fm, body: m[2] }
}

for (const file of readdirSync(SRC)) {
  if (!file.endsWith('.md')) continue
  const src = readFileSync(join(SRC, file), 'utf8')
  const { fm, body } = parseFrontmatter(src)
  const slug = fm.slug
  const title = fm.title.replace(/^["']|["']$/g, '')
  const description = (fm.excerpt ?? '').replace(/^["']|["']$/g, '')
  const tags = Array.isArray(fm.tags) ? fm.tags : []
  const canonical = `${CANONICAL_BASE}/${slug}`

  let out = body.replace(/^\s+/, '')
  out = out.replace(/^#\s+.+\n+/, '')
  out = out.replace(/\]\(\/blog\//g, '](/')

  const newFm = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `date: "${fm.date}"`,
    `slug: "${slug}"`,
    `description: ${JSON.stringify(description)}`,
    `tags: [${tags.map((t) => JSON.stringify(t)).join(', ')}]`,
    `draft: false`,
    `canonical: "${canonical}"`,
    '---',
    '',
  ].join('\n')

  const destPath = join(DEST, `${slug}.mdx`)
  writeFileSync(destPath, newFm + out)
  console.log('wrote', destPath)
}
