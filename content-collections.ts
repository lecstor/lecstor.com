import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import readingTime from 'reading-time'
import { z } from 'zod'

const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    canonical: z.string().url().optional(),
  }),
  transform: async (doc, ctx) => {
    const mdx = await compileMDX(ctx, doc, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: 'github-dark-dimmed',
            defaultLang: 'plaintext',
            keepBackground: true,
          },
        ],
      ],
    })
    const slug = doc._meta.path.replace(/\/index$/, '')
    // Gatsby-era dates like "2019-03-21T10:31:13+10" are not valid ISO 8601
    // (offset must be ±HH:MM or ±HHMM). Normalize here so Date() parses them.
    const normalizedDate = doc.date.replace(/(T\d{2}:\d{2}:\d{2})([+-]\d{2})$/, '$1$2:00')
    const plain = doc.content
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/[*_>]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    const excerpt = plain.length > 200 ? plain.slice(0, 200).replace(/\s\S*$/, '') + '…' : plain
    return {
      ...doc,
      date: normalizedDate,
      slug,
      url: `/${slug}`,
      mdx,
      excerpt,
      readingTime: Math.max(1, Math.round(readingTime(doc.content).minutes)),
    }
  },
})

export default defineConfig({
  collections: [posts],
})
