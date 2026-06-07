import { cn } from "@/lib/utils";

/**
 * Logo component that renders the TaskSphere logo with a transparent-looking
 * background. Uses CSS background-blend-mode: lighten to make the logo's
 * baked-in dark background invisible against any dark page background.
 *
 * This approach is immune to stacking context issues that break mix-blend-mode.
 */
interface LogoProps {
  className?: string;
  /** The CSS background color to blend with. Should match or be close to the parent's background. */
  bgColor?: string;
}

export const Logo = ({ className, bgColor }: LogoProps) => {
  return (
    <div
      className={cn("bg-no-repeat bg-contain bg-center shrink-0", className)}
      style={{
        backgroundImage: "url(/logo.png)",
        backgroundColor: bgColor || "var(--sidebar)",
        backgroundBlendMode: "lighten",
      }}
      role="img"
      aria-label="TaskSphere"
    />
  );
};
