import { MDXContent as MDX } from '@content-collections/mdx/react'
import type { Post } from '~/lib/posts'

export function MDXContent({ post }: { post: Post }) {
  return <MDX code={post.mdx} />
}
