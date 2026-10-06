import { ArrowRight } from "lucide-react";

import { Badge } from "../../components/badge/badge";
import { Button } from "../../components/button/button";

import { Hero, HeroActions, HeroDescription, HeroEyebrow, HeroTitle, HeroVisual } from "./hero";

const deployments = [
  { name: "web", version: "2.4.0", state: "Live", when: "4 minutes ago" },
  { name: "api", version: "2.3.9", state: "Live", when: "2 hours ago" },
  { name: "worker", version: "1.0.2", state: "Staged", when: "Yesterday" },
];

export function HeroDemo() {
  return (
    <div className="flex flex-col gap-16">
      <Hero>
        <HeroEyebrow>Now in public beta</HeroEyebrow>
        <HeroTitle>The component library you own, not the one you rent.</HeroTitle>
        <HeroDescription>
          Forme components are copied into your project as plain source. Edit the token, rewrite the
          part that does not fit, and keep the change for as long as you like.
        </HeroDescription>

        <HeroActions>
          <Button asChild>
            <a href="https://formeui.com">
              Get started
              <ArrowRight />
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a href="https://formeui.com/components">Browse components</a>
          </Button>
        </HeroActions>

        <HeroVisual>
          <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
            <p className="text-sm font-medium">Deployments</p>
            <Badge variant="success">
              <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
              All systems operational
            </Badge>
          </div>

          <ul className="divide-y divide-border">
            {deployments.map((deployment) => (
              <li
                key={deployment.name}
                className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
              >
                <span className="font-mono text-xs">
                  {deployment.name}
                  <span className="ml-2 text-muted-foreground">v{deployment.version}</span>
                </span>
                <span className="flex items-center gap-3">
                  <Badge size="sm" variant={deployment.state === "Live" ? "brand" : "neutral"}>
                    {deployment.state}
                  </Badge>
                  <span className="hidden text-xs text-muted-foreground sm:inline">
                    {deployment.when}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </HeroVisual>
      </Hero>
    </div>
  );
}
