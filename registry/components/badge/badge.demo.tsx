import { CircleDot, Sparkles } from "lucide-react";

import { Badge } from "./badge";

export function BadgeDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>Neutral</Badge>
        <Badge variant="brand">Brand</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="success">
          <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
          Operational
        </Badge>
        <Badge variant="warning">
          <CircleDot className="text-warning" />2 degraded
        </Badge>
        <Badge variant="destructive">
          <span className="size-1.5 rounded-full bg-destructive" aria-hidden="true" />
          Build failed
        </Badge>
        <Badge variant="brand">
          <Sparkles />
          New
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="sm" variant="brand">
          Small brand
        </Badge>
        <Badge size="sm" variant="success">
          Small success
        </Badge>
      </div>
    </div>
  );
}
