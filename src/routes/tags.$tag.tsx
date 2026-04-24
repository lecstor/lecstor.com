import * as stylex from '@stylexjs/stylex'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { PostList } from '~/components/PostList'
import { postsByTag } from '~/lib/posts'
import { text } from '../styles/tokens.stylex'

const styles = stylex.create({
  title: { fontSize: text.h2, marginTop: 0 },
})

export const Route = createFileRoute('/tags/$tag')({
  loader: ({ params }) => {
    const list = postsByTag(params.tag)
    if (list.length === 0) throw notFound()
    return { posts: list, tag: params.tag }
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `Tag: ${loaderData.tag} | Lecstor's Blog` }] : [],
  }),
  component: TagPage,
})

function TagPage() {
  const { posts, tag } = Route.useLoaderData()
  return (
    <>
      <h1 {...stylex.props(styles.title)}>Tagged "{tag}"</h1>
      <PostList posts={posts} />
    </>
  )
}
