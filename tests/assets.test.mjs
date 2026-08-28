import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

/** Every /assets/... path the app asks for, across source and the HTML shell. */
function referencedAssets() {
  const sources = [...walk(path.join(root, "src")), path.join(root, "index.html")];
  const pattern = /\/assets\/[A-Za-z0-9._/-]+\.(?:png|jpe?g|svg|webp|ico|gif)/g;
  const found = new Set();

  for (const file of sources) {
    if (!statSync(file).isFile()) continue;
    for (const match of readFileSync(file, "utf8").matchAll(pattern)) {
      found.add(match[0].replace(/^\//, ""));
    }
  }
  return [...found].sort();
}

function trackedPublicFiles() {
  const output = execFileSync("git", ["ls-files", "public"], { cwd: root, encoding: "utf8" });
  return new Set(output.split("\n").filter(Boolean).map((file) => file.replace(/^public\//, "")));
}

// A file present on the developer's disk but excluded by .gitignore builds and
// renders perfectly here, then 404s once CI checks the repo out. That is how
// nine CSR images reached staging as broken links, so check git, not the disk.
test("every asset the app references is tracked by git", () => {
  const tracked = trackedPublicFiles();
  const missing = referencedAssets().filter((asset) => !tracked.has(asset));

  assert.deepEqual(
    missing,
    [],
    `Referenced but not committed:\n  ${missing.join("\n  ")}\n` +
      "If these exist locally, check `git check-ignore -v public/<path>`.",
  );
});

test("no asset is ignored by a rule meant for the repository root", () => {
  const assets = walk(path.join(root, "public", "assets")).map((file) => path.relative(root, file));
  if (assets.length === 0) return;

  // check-ignore exits 1 when nothing matches, which is the outcome we want,
  // so a non-zero exit is success rather than an error.
  let ignored = "";
  try {
    ignored = execFileSync("git", ["check-ignore", "--no-index", "-v", ...assets], {
      cwd: root,
      encoding: "utf8",
    }).trim();
  } catch (error) {
    if (error.status !== 1) throw error;
  }

  assert.equal(ignored, "", `These assets are gitignored:\n${ignored}`);
});
