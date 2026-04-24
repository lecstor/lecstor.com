import { createFileRoute } from '@tanstack/react-router'
import { posts } from '../lib/posts'

type Entry = {
  slug: string
  title: string
  date: string
  description?: string
  tags: string[]
  body: string
}

function buildIndex(): Entry[] {
  return posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    description: p.description,
    tags: p.tags,
    body: p.content
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/[#*_`>\-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 4000),
  }))
}

export const Route = createFileRoute('/search-index.json')({
  server: {
    handlers: {
      GET: () =>
        new Response(JSON.stringify(buildIndex()), {
          headers: {
            'content-type': 'application/json; charset=utf-8',
            'cache-control': 'public, max-age=600',
          },
        }),
    },
  },
})
