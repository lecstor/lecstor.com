#!/usr/bin/env node
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = process.argv[2] ?? join(__dirname, '../../lecstor.github.io/src/pages')
const DEST = join(__dirname, '../content/posts')

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) return { data: {}, body: raw }
  const data = {}
  for (const line of m[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let val = line.slice(idx + 1).trim()
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1)
    data[key] = val
  }
  return { data, body: m[2] }
}

function escapeYaml(s) {
  if (/[:#&*!|>'"%@`\-?,\[\]{}]/.test(s) || /^\s|\s$/.test(s)) {
    return JSON.stringify(s)
  }
  return `"${s}"`
}

async function main() {
  if (!existsSync(DEST)) await mkdir(DEST, { recursive: true })
  const entries = await readdir(SRC, { withFileTypes: true })
  let count = 0
  for (const e of entries) {
    if (!e.isDirectory()) continue
    const slug = e.name
    const mdPath = join(SRC, slug, 'index.md')
    if (!existsSync(mdPath)) continue
    const raw = await readFile(mdPath, 'utf-8')
    const { data, body } = parseFrontmatter(raw)
    const title = data.title ?? slug
    const date = data.date ?? '1970-01-01'
    const fm = [
      '---',
      `title: ${escapeYaml(title)}`,
      `date: ${escapeYaml(date)}`,
      `slug: ${escapeYaml(slug)}`,
      'tags: []',
      'draft: false',
      '---',
      '',
    ].join('\n')
    const out = join(DEST, `${slug}.mdx`)
    await writeFile(out, fm + body, 'utf-8')
    console.log(`wrote ${basename(out)}`)
    count++
  }
  console.log(`\nMigrated ${count} posts → ${DEST}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
