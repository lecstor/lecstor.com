import * as stylex from '@stylexjs/stylex'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { colors, space, text } from '../styles/tokens.stylex'

type Entry = {
  slug: string
  title: string
  date: string
  description?: string
  tags: string[]
  body: string
}

const styles = stylex.create({
  title: { fontSize: text.h2, marginTop: 0 },
  input: {
    backgroundColor: colors.bgElevated,
    border: `1px solid ${colors.border}`,
    borderRadius: '6px',
    color: colors.text,
    fontSize: text.base,
    padding: space.sm,
    width: '100%',
  },
  results: { listStyle: 'none', margin: `${space.lg} 0`, padding: 0 },
  item: { marginBottom: space.md },
  link: { color: colors.link, fontSize: text.h3, textDecoration: 'none' },
  snippet: { color: colors.textMuted, marginTop: space.xs },
  note: { color: colors.textMuted, fontSize: text.small, marginTop: space.sm },
})

function score(entry: Entry, terms: string[]): number {
  let s = 0
  const title = entry.title.toLowerCase()
  const body = entry.body.toLowerCase()
  const tags = entry.tags.join(' ').toLowerCase()
  for (const t of terms) {
    if (!t) continue
    if (title.includes(t)) s += 10
    if (tags.includes(t)) s += 5
    if (body.includes(t)) s += 1
  }
  return s
}

function snippet(body: string, terms: string[]): string {
  const lower = body.toLowerCase()
  for (const t of terms) {
    const i = lower.indexOf(t)
    if (i >= 0) {
      const start = Math.max(0, i - 60)
      const end = Math.min(body.length, i + 120)
      return (start > 0 ? '…' : '') + body.slice(start, end) + (end < body.length ? '…' : '')
    }
  }
  return body.slice(0, 160) + (body.length > 160 ? '…' : '')
}

export const Route = createFileRoute('/search')({
  head: () => ({ meta: [{ title: "Search | Lecstor's Blog" }] }),
  component: SearchPage,
})

function SearchPage() {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<Entry[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/search-index.json')
      .then((r) => (r.ok ? (r.json() as Promise<Entry[]>) : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        if (!cancelled) setIndex(data)
      })
      .catch(() => {
        if (!cancelled) setError('Search index unavailable.')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const terms = useMemo(
    () =>
      query
        .toLowerCase()
        .split(/\s+/)
        .map((t) => t.trim())
        .filter(Boolean),
    [query],
  )

  const results = useMemo(() => {
    if (!index || terms.length === 0) return []
    return index
      .map((e) => ({ e, s: score(e, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 20)
      .map((r) => r.e)
  }, [index, terms])

  return (
    <>
      <h1 {...stylex.props(styles.title)}>Search</h1>
      <input
        type="search"
        autoFocus
        placeholder="Search posts…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        {...stylex.props(styles.input)}
      />
      {error ? <p {...stylex.props(styles.note)}>{error}</p> : null}
      {!index && !error ? <p {...stylex.props(styles.note)}>Loading index…</p> : null}
      {index && terms.length > 0 && results.length === 0 ? (
        <p {...stylex.props(styles.note)}>No matches.</p>
      ) : null}
      <ul {...stylex.props(styles.results)}>
        {results.map((r) => (
          <li key={r.slug} {...stylex.props(styles.item)}>
            <Link to="/$slug" params={{ slug: r.slug }} {...stylex.props(styles.link)}>
              {r.title}
            </Link>
            <div {...stylex.props(styles.snippet)}>{snippet(r.body, terms)}</div>
          </li>
        ))}
      </ul>
    </>
  )
}
