/**
 * Motion presets. Every Forme component that animates uses these, so motion
 * across the whole library feels like one hand made it.
 *
 * Nothing is imported here on purpose: these are plain values, so the shared
 * timing costs no bundle and installs no animation runtime.
 */
export const ease = {
  /** Default for state changes: fast out, settled in. */
  standard: [0.2, 0, 0, 1],
  /** For something entering: a little overshoot, no bounce. */
  entrance: [0.16, 1, 0.3, 1],
  /** For something leaving: quick, so it never holds the page. */
  exit: [0.4, 0, 1, 1],
} as const;

export const duration = {
  instant: 0.09,
  fast: 0.15,
  standard: 0.24,
  slow: 0.4,
} as const;

export const spring = {
  /** Presses, toggles, small movement. */
  snappy: { type: "spring", stiffness: 420, damping: 34, mass: 0.7 },
  /** Panels and layout that should settle rather than snap. */
  gentle: { type: "spring", stiffness: 220, damping: 26, mass: 0.9 },
} as const;
