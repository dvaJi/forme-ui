"use client";

import { CreditCard, FileText, LayoutGrid, LifeBuoy, Search, Settings, User } from "lucide-react";
import { useState } from "react";

import { Button } from "../../components/button/button";

import {
  CommandMenu,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuInput,
  CommandMenuItem,
  CommandMenuList,
  CommandMenuSeparator,
} from "./command-menu";

export function CommandMenuDemo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);

  // cmdk hands the item's `value` to `onSelect`, so one handler names the
  // command and closes the palette, the way a native command palette does.
  function run(value: string) {
    setLast(value);
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="secondary" onClick={() => setOpen(true)}>
          <Search />
          Search
          <kbd className="ml-1 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted-foreground">
            ⌘K
          </kbd>
        </Button>
        <p className="text-sm text-muted-foreground">
          {last ? (
            <>
              Ran <span className="text-foreground">{last}</span>
            </>
          ) : (
            "Press ⌘K, or Ctrl K on Windows and Linux."
          )}
        </p>
      </div>

      <CommandMenu label="Command menu" open={open} onOpenChange={setOpen}>
        <CommandMenuInput placeholder="Type a command or search..." />

        <CommandMenuList>
          <CommandMenuEmpty>No commands found.</CommandMenuEmpty>

          <CommandMenuGroup heading="Go to">
            <CommandMenuItem
              value="overview"
              keywords={["home", "dashboard", "start"]}
              onSelect={run}
            >
              <LayoutGrid />
              Overview
            </CommandMenuItem>
            <CommandMenuItem
              value="deployments"
              keywords={["releases", "production"]}
              onSelect={run}
            >
              <FileText />
              Deployments
            </CommandMenuItem>
            <CommandMenuItem value="settings" keywords={["preferences", "config"]} onSelect={run}>
              <Settings />
              Settings
            </CommandMenuItem>
          </CommandMenuGroup>

          <CommandMenuSeparator />

          <CommandMenuGroup heading="Account">
            <CommandMenuItem value="profile" keywords={["name", "email"]} onSelect={run}>
              <User />
              Profile
            </CommandMenuItem>
            <CommandMenuItem
              value="billing"
              keywords={["invoice", "plan", "payment"]}
              onSelect={run}
            >
              <CreditCard />
              Billing
            </CommandMenuItem>
            <CommandMenuItem value="support" keywords={["help", "contact"]} onSelect={run}>
              <LifeBuoy />
              Contact support
            </CommandMenuItem>
          </CommandMenuGroup>
        </CommandMenuList>
      </CommandMenu>
    </div>
  );
}
