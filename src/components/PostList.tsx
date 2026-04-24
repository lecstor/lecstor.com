import * as stylex from '@stylexjs/stylex'
import { Link } from '@tanstack/react-router'
import { colors, space, text } from '../styles/tokens.stylex'
import type { Post } from '../lib/posts'

const styles = stylex.create({
  list: { listStyle: 'none', margin: 0, padding: 0 },
  item: { marginBottom: space.lg },
  title: {
    color: colors.text,
    fontSize: text.h3,
    fontWeight: 600,
    margin: 0,
    textDecoration: 'none',
  },
  meta: { color: colors.textMuted, fontSize: text.small, marginTop: space.xs },
  desc: { color: colors.text, marginTop: space.xs },
})

function formatDate(s: string) {
  return new Date(s).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul {...stylex.props(styles.list)}>
      {posts.map((p) => (
        <li key={p.slug} {...stylex.props(styles.item)}>
          <Link to="/$slug" params={{ slug: p.slug }} {...stylex.props(styles.title)}>
            {p.title}
          </Link>
          <div {...stylex.props(styles.meta)}>
            {formatDate(p.date)} · {p.readingTime} min read
            {p.draft ? ' · DRAFT' : ''}
          </div>
          <p {...stylex.props(styles.desc)}>{p.description ?? p.excerpt}</p>
        </li>
      ))}
    </ul>
  )
}
