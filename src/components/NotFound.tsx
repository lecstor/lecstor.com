import * as stylex from '@stylexjs/stylex'
import { Link } from '@tanstack/react-router'
import { colors, space, text } from '../styles/tokens.stylex'

const styles = stylex.create({
  root: {
    padding: space.xl,
    textAlign: 'center',
    color: colors.text,
  },
  title: { fontSize: text.h2, margin: 0 },
  body: { color: colors.textMuted, marginTop: space.md },
  link: { color: colors.link },
})

export function NotFound() {
  return (
    <div {...stylex.props(styles.root)}>
      <h1 {...stylex.props(styles.title)}>Not found</h1>
      <p {...stylex.props(styles.body)}>
        That page doesn't exist. <Link to="/" {...stylex.props(styles.link)}>Back home</Link>.
      </p>
    </div>
  )
}
