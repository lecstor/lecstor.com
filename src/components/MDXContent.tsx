import { MDXContent as MDX } from '@content-collections/mdx/react'
import * as stylex from '@stylexjs/stylex'
import type { ComponentProps } from 'react'
import { colors, space, text } from '../styles/tokens.stylex'
import type { Post } from '~/lib/posts'

const styles = stylex.create({
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBlock: space.lg,
    fontSize: text.base,
  },
  th: {
    textAlign: 'left',
    fontWeight: 600,
    padding: `${space.sm} ${space.md}`,
    borderBottom: `2px solid ${colors.border}`,
    verticalAlign: 'top',
    width: { default: 'auto', ':first-of-type': '11rem' },
    whiteSpace: { default: 'normal', ':first-of-type': 'nowrap' },
  },
  td: {
    padding: `${space.sm} ${space.md}`,
    borderBottom: `1px solid ${colors.border}`,
    verticalAlign: 'top',
    width: { default: 'auto', ':first-of-type': '11rem' },
  },
})

const components = {
  table: (props: ComponentProps<'table'>) => (
    <table {...props} {...stylex.props(styles.table)} />
  ),
  th: (props: ComponentProps<'th'>) => <th {...props} {...stylex.props(styles.th)} />,
  td: (props: ComponentProps<'td'>) => <td {...props} {...stylex.props(styles.td)} />,
}

export function MDXContent({ post }: { post: Post }) {
  return <MDX code={post.mdx} components={components} />
}
