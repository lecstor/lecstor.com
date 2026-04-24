import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Bio } from '../components/Bio'
import { PostList } from '../components/PostList'
import { TagCloud } from '../components/TagCloud'
import { posts } from '../lib/posts'
import { colors, space, text } from '../styles/tokens.stylex'

const SIDEBAR_BREAKPOINT = '@media (min-width: 48rem)'

const styles = stylex.create({
  bioSpacer: { marginBottom: space.xl },
  promo: {
    backgroundColor: colors.bgElevated,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    padding: space.lg,
    marginBottom: space.xl,
    fontSize: text.small,
    color: colors.textMuted,
  },
  promoHeading: {
    color: colors.text,
    fontSize: text.base,
    fontWeight: 600,
    marginTop: 0,
    marginBottom: space.xs,
  },
  promoBody: { margin: 0 },
  link: { color: colors.link },
  layout: {
    display: 'flex',
    flexDirection: { default: 'column', [SIDEBAR_BREAKPOINT]: 'row' },
    gap: space.xl,
    alignItems: 'flex-start',
  },
  main: { flex: 1, minWidth: 0 },
  sidebar: {
    flexShrink: 0,
    width: { default: '100%', [SIDEBAR_BREAKPOINT]: '11rem' },
    position: { default: 'static', [SIDEBAR_BREAKPOINT]: 'sticky' },
    top: space.lg,
  },
})

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <div {...stylex.props(styles.bioSpacer)}>
        <Bio />
      </div>
      <aside {...stylex.props(styles.promo)}>
        <p {...stylex.props(styles.promoHeading)}>I'm building makesPDF</p>
        <p {...stylex.props(styles.promoBody)}>
          An AI-native PDF generator that runs on Cloudflare Workers — sub-second renders, no
          headless browser, no eval. Give it a sample document and it writes the template for
          you.{' '}
          <a href="https://makespdf.com" {...stylex.props(styles.link)}>Take a look →</a>
        </p>
      </aside>
      <div {...stylex.props(styles.layout)}>
        <div {...stylex.props(styles.main)}>
          <PostList posts={posts} />
        </div>
        <aside {...stylex.props(styles.sidebar)}>
          <TagCloud />
        </aside>
      </div>
    </>
  )
}
