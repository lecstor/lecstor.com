import * as stylex from '@stylexjs/stylex'
import { Link, createFileRoute } from '@tanstack/react-router'
import { allTags } from '~/lib/posts'
import { colors, space, text } from '../styles/tokens.stylex'

const styles = stylex.create({
  title: { fontSize: text.h2, marginTop: 0 },
  list: { display: 'flex', flexWrap: 'wrap', gap: space.sm, listStyle: 'none', padding: 0 },
  tag: {
    border: `1px solid ${colors.border}`,
    borderRadius: '999px',
    color: colors.text,
    fontSize: text.small,
    padding: `${space.xs} ${space.md}`,
    textDecoration: 'none',
  },
})

export const Route = createFileRoute('/tags/')({
  head: () => ({ meta: [{ title: "Tags | Lecstor's Blog" }] }),
  component: TagsIndex,
})

function TagsIndex() {
  const tags = allTags()
  return (
    <>
      <h1 {...stylex.props(styles.title)}>Tags</h1>
      {tags.length === 0 ? (
        <p>No tags yet.</p>
      ) : (
        <ul {...stylex.props(styles.list)}>
          {tags.map(({ tag, count }) => (
            <li key={tag}>
              <Link to="/tags/$tag" params={{ tag }} {...stylex.props(styles.tag)}>
                {tag} ({count})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
