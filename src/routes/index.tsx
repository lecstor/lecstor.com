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
        <p {...stylex.props(styles.promoHeading)}>I'm building EzyApp</p>
        <p {...stylex.props(styles.promoBody)}>
          A web app builder where the AI writes the app. You describe what you want, the AI
          produces a small DSL, EzyApp runs it on Cloudflare and serves it on its own
          subdomain (its own database, its own auth, fully isolated from every other app).{' '}
          <a href="https://ezyapp.com" {...stylex.props(styles.link)}>Take a look →</a>
        </p>
      </aside>
      <aside {...stylex.props(styles.promo)}>
        <p {...stylex.props(styles.promoHeading)}>And still tending makesPDF</p>
        <p {...stylex.props(styles.promoBody)}>
          Now that the dust has settled on makesPDF, I've started another project. It's still
          running.. an HTTP API that turns Markdown or a small JavaScript DSL into a PDF in
          well under a second, no browser involved.{' '}
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
