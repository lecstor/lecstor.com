import * as stylex from '@stylexjs/stylex'
import { ErrorComponent, type ErrorComponentProps } from '@tanstack/react-router'
import { colors, space, text } from '../styles/tokens.stylex'

const styles = stylex.create({
  root: { padding: space.xl, color: colors.text },
  title: { fontSize: text.h2, margin: 0 },
  body: { color: colors.textMuted, marginTop: space.md },
})

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  return (
    <div {...stylex.props(styles.root)}>
      <h1 {...stylex.props(styles.title)}>Something went wrong</h1>
      <p {...stylex.props(styles.body)}>{error.message}</p>
      <ErrorComponent error={error} />
    </div>
  )
}
