import type { FormeMetadata } from "../../types";

export const metadata = {
  name: "dialog",
  title: "Dialog",
  description:
    "A modal built on the Base UI primitive, so the focus trap, the inert background, Esc to close and the return of focus all come from one well tested place. The backdrop fades and the panel scales in, both in and out, and everything comes from the foundation tokens.",
  category: "overlays",
  tier: "free",
  keywords: [
    "dialog",
    "modal",
    "popup",
    "backdrop",
    "confirm",
    "alert dialog",
    "focus trap",
    "shadcn dialog",
  ],
  entry: "./dialog.tsx",
  registryDependencies: ["forme-foundation"],
  dependencies: ["@base-ui-components/react"],
} satisfies FormeMetadata;
