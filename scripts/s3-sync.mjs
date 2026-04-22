import { spawnSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"

function loadDotEnvIfPresent() {
  if (!existsSync(".env")) return

  const content = readFileSync(".env", "utf8")
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith("#")) continue

    const eqIndex = line.indexOf("=")
    if (eqIndex <= 0) continue

    const key = line.slice(0, eqIndex).trim()
    const value = line.slice(eqIndex + 1).trim().replace(/^['\"]|['\"]$/g, "")
    if (!process.env[key]) process.env[key] = value
  }
}

loadDotEnvIfPresent()

const bucket = process.env.S3_BUCKET
const region = process.env.AWS_REGION || "eu-west-1"

if (!bucket) {
  console.error("Missing S3_BUCKET environment variable.")
  console.error("Set it in your shell or in a local .env file (which is gitignored).")
  process.exit(1)
}

const args = ["s3", "sync", "dist", `s3://${bucket}`, "--region", region]
const result = spawnSync("aws", args, {
  stdio: "inherit",
  shell: process.platform === "win32",
})

if (result.error) {
  console.error("Failed to execute aws CLI:", result.error.message)
  process.exit(1)
}

process.exit(result.status ?? 1)
