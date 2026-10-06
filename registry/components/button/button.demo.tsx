import { ArrowRight, Plus, Trash2 } from "lucide-react";

import { Button, ButtonLink } from "./button";

/**
 * The showcase, in the order someone actually decides things: the four variants,
 * then the three sizes, then icons.
 *
 * Kept to three rows on purpose. A demo that also documents every state stops
 * being a preview of the component and becomes a page, and the row you would
 * actually copy from gets lost in it. States live in the docs table instead.
 */
export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <Button>Get started</Button>
        <Button variant="secondary" trailingIcon={ArrowRight}>
          Continue
        </Button>
        <Button variant="ghost">Mark as done</Button>
        <Button variant="danger">Delete</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button size="medium">Medium</Button>
        <Button variant="secondary" size="small">
          Small
        </Button>
        <Button variant="ghost" size="xs">
          Xs
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button leadingIcon={Plus}>New project</Button>
        <Button variant="secondary" trailingIcon={ArrowRight}>
          Continue
        </Button>
        <Button variant="danger" leadingIcon={Trash2}>
          Delete
        </Button>
        <Button iconOnly leadingIcon={Plus} aria-label="New project" />
        <Button variant="secondary" iconOnly leadingIcon={Plus} aria-label="New project" />
        <Button variant="ghost" size="small" iconOnly leadingIcon={Plus} aria-label="New project" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button loading>Saving</Button>
        <Button variant="secondary" loading>
          Saving
        </Button>
        <Button disabled>Disabled</Button>
        <Button variant="ghost" disabled>
          Disabled
        </Button>
        <Button variant="danger" disabled>
          Disabled
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <ButtonLink href="/docs/introduction">Documentation</ButtonLink>
        <ButtonLink href="/docs/cli" variant="secondary" trailingIcon={ArrowRight}>
          Changelog
        </ButtonLink>
      </div>
    </div>
  );
}
