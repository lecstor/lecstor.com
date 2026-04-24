import * as stylex from '@stylexjs/stylex'
import { Link } from '@tanstack/react-router'
import { allTags } from '~/lib/posts'
import { colors, space, text } from '../styles/tokens.stylex'

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.sm,
  },
  heading: {
    color: colors.textMuted,
    fontSize: text.small,
    fontWeight: 600,
    letterSpacing: '0.05em',
    margin: 0,
    textTransform: 'uppercase',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: space.xs,
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  tag: {
    border: `1px solid ${colors.border}`,
    borderRadius: '999px',
    color: colors.text,
    fontSize: text.small,
    padding: `${space.xs} ${space.sm}`,
    textDecoration: 'none',
  },
  count: { color: colors.textMuted },
})

export function TagCloud() {
  const tags = allTags()
  if (tags.length === 0) return null
  return (
    <div {...stylex.props(styles.root)}>
      <h2 {...stylex.props(styles.heading)}>Tags</h2>
      <ul {...stylex.props(styles.list)}>
        {tags.map(({ tag, count }) => (
          <li key={tag}>
            <Link to="/tags/$tag" params={{ tag }} {...stylex.props(styles.tag)}>
              {tag} <span {...stylex.props(styles.count)}>({count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
