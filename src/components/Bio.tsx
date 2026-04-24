import * as stylex from '@stylexjs/stylex'
import { colors, space } from '../styles/tokens.stylex'

const styles = stylex.create({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    gap: space.md,
  },
  asFooter: {
    marginTop: space.xl,
    paddingTop: space.lg,
    borderTop: `1px solid ${colors.border}`,
  },
  avatar: {
    borderRadius: '50%',
    height: '3.5rem',
    width: '3.5rem',
    flexShrink: 0,
  },
  body: { margin: 0 },
  para: { margin: 0, marginBottom: space.sm },
  link: { color: colors.link },
})

export function Bio({ variant = 'header' }: { variant?: 'header' | 'footer' } = {}) {
  return (
    <div {...stylex.props(styles.root, variant === 'footer' && styles.asFooter)}>
      <img src="/profile-pic.jpg" alt="Jason Galea" {...stylex.props(styles.avatar)} />
      <div {...stylex.props(styles.body)}>
        <p {...stylex.props(styles.para)}>
          Written by <strong>Jason Galea</strong> from Cairns, Australia.
        </p>
        <p {...stylex.props(styles.para)}>
          Full Stack developer specialising in React and NodeJS.
        </p>
        <p {...stylex.props(styles.para)}>
          <a href="https://www.linkedin.com/in/jasongalea/" {...stylex.props(styles.link)}>LinkedIn</a>
          {' | '}
          <a href="https://github.com/lecstor" {...stylex.props(styles.link)}>Github</a>
          {' | '}
          <a href="https://stackoverflow.com/users/1315176/lecstor" {...stylex.props(styles.link)}>StackOverflow</a>
        </p>
      </div>
    </div>
  )
}
