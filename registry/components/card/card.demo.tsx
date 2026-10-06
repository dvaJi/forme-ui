import { ArrowRight, Check } from "lucide-react";

import { Button } from "../../components/button/button";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

const rows = [
  { name: "web", version: "2.4.0", state: "Live" },
  { name: "api", version: "2.3.9", state: "Live" },
  { name: "worker", version: "1.0.2", state: "Staged" },
];

export function CardDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Deployments</CardTitle>
            <CardDescription>
              Every environment in the workspace, newest first. Deleting a deployment keeps its logs
              for thirty days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border text-sm">
              {rows.map((row) => (
                <li key={row.name} className="flex items-center justify-between gap-4 py-2.5">
                  <span className="font-mono text-xs">
                    {row.name} <span className="text-muted-foreground">v{row.version}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">{row.state}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="justify-between border-t border-border pt-6">
            <span className="text-xs text-muted-foreground">Updated 4 minutes ago</span>
            <Button variant="ghost" size="small">
              View logs
              <ArrowRight />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Two-factor authentication</CardTitle>
            <CardDescription>
              Require a second factor for everyone who signs in to the workspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="size-4 text-brand" />
                Passkeys and security keys
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-brand" />
                Recovery codes
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-brand" />
                Audit log entries
              </li>
            </ul>
          </CardContent>
          <CardFooter className="border-t border-border pt-6">
            <Button size="small">Turn on</Button>
            <Button variant="ghost" size="small">
              Learn more
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="w-full max-w-3xl py-5">
        <CardHeader>
          <CardTitle>Header, content, no footer</CardTitle>
          <CardDescription>
            Every part is optional, so a card can be as plain as it needs to be.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Nothing here needs a header row or a row of actions, so it does not have one.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
