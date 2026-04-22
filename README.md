# React + TypeScript + Vite + shadcn/ui

This is a template for a new Vite project with React, TypeScript, and shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `src/components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button"
```

## Deploy to S3

This project deploys by building and syncing `dist` directly to the S3 bucket configured in your local environment.

1. Ensure AWS credentials are available in your shell.
2. Set deployment environment variables in your shell or local `.env` file:

```bash
S3_BUCKET=your-bucket-name
AWS_REGION=eu-west-1
```

3. Build and deploy:

```bash
bun run s3:deploy
```

This runs:

```bash
bun run build && node scripts/s3-sync.mjs
```
