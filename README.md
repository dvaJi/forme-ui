# Forme UI

Beautiful React components, yours to shape.

```bash
npx shadcn@latest add @forme/button
```

Every Forme component is copied into your project as plain source. There is no
`@forme/ui` runtime package, no build step and no update mechanism — the code
in `components/forme/` is your code, and it keeps working with or without us.

## What is in here

- `12` Free components and blocks, MIT licensed
- `2` of them are larger composed blocks
- React 19, TypeScript, Tailwind CSS v4, Radix primitives where they earn their place

## Registry setup

Add Forme to `components.json`:

```json
{
  "registries": {
    "@forme": "https://formeui.com/r/{name}.json"
  }
}
```

Then install anything by name:

```bash
npx shadcn@latest add @forme/animated-tabs
```

You can also fetch an item without the CLI:

```bash
curl https://formeui.com/r/button.json
```

## Layout

```
registry/components/<name>/<name>.tsx   the component
registry/components/<name>/metadata.ts   its name, category, keywords, dependencies
registry/components/<name>/<name>.demo.tsx  a runnable example
registry/blocks/<name>/                  larger composed sections
registry/foundation.css                  design tokens
registry/lib/                            shared helpers and motion presets
registry.json                            the registry index
public/r/                                prebuilt registry items
```

`metadata.ts` is the only description of an item. The registry is derived from
these files, so a component, its metadata and its published JSON cannot drift
apart.

## Contributing

Open an issue before building something large. A component should be small,
readable, accessible and something you would be happy to read after copying it.
If you cannot explain how it works in a few lines, it is probably too clever.

## License

MIT. See [LICENSE](./LICENSE).

## Forme Pro

Larger screens — dashboards, AI interfaces, billing, settings, application
shells — live in **Forme Pro**. Pro is installed with a different command and
the same promise:

```bash
npx forme login
npx forme add analytics-dashboard
```

See <https://formeui.com/pro>.
