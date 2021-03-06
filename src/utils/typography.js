import Typography from "typography";
import CodePlugin from "typography-plugin-code";
import Github from "typography-theme-github";

Github.plugins = [new CodePlugin()];

Github.overrideThemeStyles = () => ({
  code: {
    fontSize: "0.75rem",
  },
});

delete Github.googleFonts;

const typography = new Typography(Github);

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
