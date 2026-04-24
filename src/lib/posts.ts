import { allPosts } from 'content-collections'

export type Post = (typeof allPosts)[number]

const isProd = process.env.NODE_ENV === 'production'

export const posts: Post[] = allPosts
  .filter((p) => (isProd ? !p.draft : true))
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function allTags(): Array<{ tag: string; count: number }> {
  const counts = new Map<string, number>()
  for (const p of posts) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1)
  return Array.from(counts, ([tag, count]) => ({ tag, count })).sort((a, b) =>
    a.tag.localeCompare(b.tag),
  )
}

export function postsByTag(tag: string): Post[] {
  return posts.filter((p) => p.tags.includes(tag))
}
