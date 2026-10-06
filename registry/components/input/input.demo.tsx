"use client";

import { Eye, EyeOff, Lock, Mail, Search } from "lucide-react";
import { useState } from "react";

import { Input } from "./input";

export function InputDemo() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid max-w-sm gap-4">
        <Input label="Email" placeholder="you@company.com" leading={<Mail />} />
        <Input
          label="Workspace"
          description="Lowercase letters, digits and dashes."
          defaultValue="acme"
        />
      </div>

      <div className="grid max-w-sm gap-4">
        <Input
          label="Search components"
          placeholder="button, card, tabs"
          leading={<Search />}
          trailing={
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted-foreground">
              ⌘K
            </kbd>
          }
        />
        <Input
          label="Password"
          type={visible ? "text" : "password"}
          leading={<Lock />}
          trailing={
            <button
              type="button"
              onClick={() => setVisible((shown) => !shown)}
              aria-label={visible ? "Hide password" : "Show password"}
              className="rounded-sm p-0.5 transition-colors hover:text-foreground"
            >
              {visible ? <EyeOff /> : <Eye />}
            </button>
          }
        />
      </div>

      <div className="grid max-w-sm gap-4">
        <Input
          label="Email"
          error="Enter an email address, like you@company.com."
          defaultValue="ada@"
        />
        <Input label="Email" error="That address is already in use." />
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <Input label="Medium" className="w-40" defaultValue="acme" />
        <Input label="Large" size="lg" className="w-40" defaultValue="acme" />
        <Input label="Disabled" className="w-40" disabled defaultValue="acme" />
        <Input label="Read only" readOnly className="w-40" defaultValue="acme" />
      </div>
    </div>
  );
}
