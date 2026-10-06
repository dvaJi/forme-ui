import type { FormeMetadata } from "../../types";

export const metadata = {
  name: "input",
  title: "Input",
  description:
    "A text field with a real label, optional description, an error that is announced and wired up with aria-describedby, and room for an icon on either side. Sizes and the invalid state come from the same tokens as every other Forme surface.",
  category: "inputs",
  tier: "free",
  keywords: [
    "text field",
    "form input",
    "textbox",
    "field validation",
    "error message",
    "search input",
    "shadcn input",
  ],
  entry: "./input.tsx",
  registryDependencies: ["forme-foundation"],
} satisfies FormeMetadata;
