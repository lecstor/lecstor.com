import * as stylex from '@stylexjs/stylex'

const DARK = '@media (prefers-color-scheme: dark)'

export const colors = stylex.defineVars({
  bg: { default: '#ffffff', [DARK]: '#0b0d10' },
  bgElevated: { default: '#f6f7f9', [DARK]: '#14171c' },
  text: { default: '#1a1d21', [DARK]: '#e6e8eb' },
  textMuted: { default: '#5b6470', [DARK]: '#8b95a3' },
  link: { default: '#0057b7', [DARK]: '#6aa9ff' },
  border: { default: '#e6e8eb', [DARK]: '#242931' },
  codeBg: { default: '#f6f7f9', [DARK]: '#14171c' },
})

export const fonts = stylex.defineVars({
  body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
})

export const space = stylex.defineVars({
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2.5rem',
  xxl: '4rem',
})

export const text = stylex.defineVars({
  base: '1.0625rem',
  small: '0.875rem',
  h1: '2rem',
  h2: '1.5rem',
  h3: '1.25rem',
  lineHeight: '1.65',
})

export const layout = stylex.defineVars({
  maxWidth: '52rem',
})
