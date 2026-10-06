import type { FormeMetadata } from "../../types";

export const metadata = {
  name: "avatar",
  title: "Avatar",
  description:
    "A user image with a fallback that shows initials while the image loads, and when it never arrives at all. Built on the Base UI avatar primitive, so the image and the fallback swap without a flash of empty space.",
  category: "data-display",
  tier: "free",
  keywords: ["avatar", "profile picture", "user image", "initials", "fallback", "shadcn avatar"],
  entry: "./avatar.tsx",
  registryDependencies: ["forme-foundation"],
  dependencies: ["@base-ui-components/react"],
} satisfies FormeMetadata;
