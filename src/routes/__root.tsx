/// <reference types="vite/client" />
import * as stylex from '@stylexjs/stylex'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { ReactNode } from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { colors, fonts, layout, space, text } from '../styles/tokens.stylex'

const SITE_TITLE = "Lecstor's Blog"
const SITE_DESC = 'Things I might want to know again later.'

const styles = stylex.create({
  body: {
    backgroundColor: colors.bg,
    color: colors.text,
    fontFamily: fonts.body,
    fontSize: text.base,
    lineHeight: text.lineHeight,
    margin: 0,
  },
  container: {
    maxWidth: layout.maxWidth,
    margin: '0 auto',
    padding: space.lg,
  },
  header: {
    alignItems: 'baseline',
    borderBottom: `1px solid ${colors.border}`,
    display: 'flex',
    gap: space.md,
    justifyContent: 'space-between',
    paddingBottom: space.md,
    marginBottom: space.xl,
  },
  nav: { display: 'flex', gap: space.md, alignItems: 'baseline' },
  title: { fontSize: text.h2, margin: 0 },
  link: {
    color: colors.text,
    textDecoration: 'none',
  },
  navLink: {
    color: colors.textMuted,
    fontSize: text.small,
    textDecoration: 'none',
  },
})

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: SITE_TITLE },
      { name: 'description', content: SITE_DESC },
      { property: 'og:site_name', content: SITE_TITLE },
      { property: 'og:type', content: 'website' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'alternate', type: 'application/rss+xml', title: SITE_TITLE, href: '/rss.xml' },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body {...stylex.props(styles.body)}>
        <div {...stylex.props(styles.container)}>
          <header {...stylex.props(styles.header)}>
            <h1 {...stylex.props(styles.title)}>
              <Link to="/" {...stylex.props(styles.link)}>{SITE_TITLE}</Link>
            </h1>
            <nav {...stylex.props(styles.nav)}>
              <Link to="/tags" {...stylex.props(styles.navLink)}>Tags</Link>
              <Link to="/search" {...stylex.props(styles.navLink)}>Search</Link>
            </nav>
          </header>
          {children ?? <Outlet />}
        </div>
        {import.meta.env.DEV ? <TanStackRouterDevtools position="bottom-right" /> : null}
        <Scripts />
        {import.meta.env.PROD ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token":"__CF_BEACON_TOKEN__"}'
          />
        ) : null}
      </body>
    </html>
  )
}
