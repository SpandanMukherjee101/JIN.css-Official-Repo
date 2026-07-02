#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PurgeCSS } from "purgecss";
import fg from "fast-glob";

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
  // Default paths to scan for used classes in the current project
  // Use relative globs so PurgeCSS scans the calling project's files, not the package folder.
  const content = [
    "./**/*.html",
    "./**/*.{js,jsx,ts,tsx}",
  ];

  // Find files before running PurgeCSS so we can log what was scanned.
  const discoveredFiles = await fg(content, {
    cwd: process.cwd(),
    ignore: ["**/node_modules/**", "**/.git/**"],
  });

  // Always use the package's on-disk JIN.css file for input
  const inputFile = inputCSS;

  console.log("🔍 Running PurgeCSS on JIN.css...");
  console.log(`🗂️  Discovered ${discoveredFiles.length} content files`);
  if (discoveredFiles.length > 0) {
    console.log(discoveredFiles.join("\n"));
  }

  try {
    const purgeCSSResult = await new PurgeCSS().purge({
      content,
      css: [inputFile],
    });

    // If PurgeCSS returns no css (it stripped everything), fall back to copying
    // the original CSS so the build doesn't fail completely. Log a warning so
    // callers can investigate why PurgeCSS removed all rules.
    const purgedCss = purgeCSSResult && purgeCSSResult[0] && typeof purgeCSSResult[0].css === "string"
      ? purgeCSSResult[0].css
      : "";

    if (!purgedCss || purgedCss.trim().length === 0) {
      const originalCss = fs.readFileSync(inputFile, "utf8");
      fs.writeFileSync(outputPath, originalCss);
      const warnMsg = "PurgeCSS removed all CSS. Falling back to original JIN.css output.";
      console.warn(`⚠️  ${warnMsg}`);
      console.log(`✅ Original CSS written to: ${outputPath}`);
    } else {
      fs.writeFileSync(outputPath, purgedCss);
      console.log(`✅ Purged CSS written to: ${outputPath}`);
    }
  } catch (err) {
    process.exit(1);
  }
})();