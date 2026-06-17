# Playground

This folder is the local development playground for the `@nuxtaid/void` layer.

## What it is for

- Running `pnpm dev` against a real Nuxt app while developing the layer.
- Testing layer behavior, content rendering, and local configuration changes.
- Verifying build, generate, and preview flows before publishing updates.

## What it is not

- It is not part of the layer API.
- It is not required when someone installs `@nuxtaid/void` in their own project.
- It should not be treated as production application code for the package itself.

## Related scripts

The root `package.json` points development commands at this folder:

```bash
pnpm dev
pnpm build
pnpm generate
pnpm preview
```

Those commands use `.playground` only for local testing and previewing.
