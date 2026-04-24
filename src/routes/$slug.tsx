import * as stylex from '@stylexjs/stylex'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { Bio } from '~/components/Bio'
import { MDXContent } from '~/components/MDXContent'
import { getPostBySlug } from '~/lib/posts'
import { colors, space, text } from '../styles/tokens.stylex'

const styles = stylex.create({
  title: { fontSize: text.h1, margin: 0 },
  meta: { color: colors.textMuted, fontSize: text.small, marginBottom: space.xl, marginTop: space.sm },
  body: {
    lineHeight: text.lineHeight,
  },
})

function formatDate(s: string) {
  return new Date(s).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const Route = createFileRoute('/$slug')({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug)
    if (!post) throw notFound()
    return { post }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} | Lecstor's Blog` },
          { name: 'description', content: loaderData.post.description ?? '' },
          { property: 'og:title', content: loaderData.post.title },
          { property: 'og:type', content: 'article' },
        ]
      : [],
    links: loaderData?.post.canonical
      ? [{ rel: 'canonical', href: loaderData.post.canonical }]
      : [],
  }),
  component: PostPage,
})

function PostPage() {
  const { post } = Route.useLoaderData()
  return (
    <article>
      <h1 {...stylex.props(styles.title)}>{post.title}</h1>
      <div {...stylex.props(styles.meta)}>
        {formatDate(post.date)} · {post.readingTime} min read
      </div>
      <div {...stylex.props(styles.body)}>
        <MDXContent post={post} />
      </div>
      <Bio variant="footer" />
    </article>
  )
}
