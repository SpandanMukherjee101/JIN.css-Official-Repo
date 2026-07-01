#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { PurgeCSS } from "purgecss";

// Input and output paths
const inputCSS = path.resolve("JIN.css");
const outputPath = process.argv.includes("--out")
  ? process.argv[process.argv.indexOf("--out") + 1]
  : path.resolve("JIN.min.css");

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

    fs.writeFileSync(outputPath, purgeCSSResult[0].css);
    console.log(`✅ Purged CSS written to: ${outputPath}`);
  } catch (err) {
    console.error("❌ PurgeCSS failed:", err);
    process.exit(1);
  }
})();