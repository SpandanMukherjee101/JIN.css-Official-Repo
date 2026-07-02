#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PurgeCSS } from "purgecss";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");

// Input and output paths
const inputCSS = path.resolve(packageRoot, "JIN.css");
const outputPath = process.argv.includes("--out")
  ? path.resolve(process.cwd(), process.argv[process.argv.indexOf("--out") + 1])
  : path.resolve(process.cwd(), "JIN.min.css");

const outputDir = path.dirname(outputPath);

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Run PurgeCSS
(async () => {
  // Default paths to scan for used classes
  const content = ["./**/*.html", "./**/*.{js,jsx,ts,tsx}"];

  // Location of your CSS inside the package
  const inputFile = path.resolve("JIN.css");

  console.log("🔍 Running PurgeCSS on JIN.css...");

  try {
    const purgeCSSResult = await new PurgeCSS().purge({
      content,
      css: [inputFile],
    });

    if (!purgeCSSResult || !purgeCSSResult[0] || typeof purgeCSSResult[0].css !== "string") {
      throw new Error("PurgeCSS returned no CSS output. Check that the input CSS file exists and the content paths are correct.");
    }

    fs.writeFileSync(outputPath, purgeCSSResult[0].css);
    console.log(`✅ Purged CSS written to: ${outputPath}`);
  } catch (err) {
    console.error("❌ PurgeCSS failed:", err);
    process.exit(1);
  }
})();