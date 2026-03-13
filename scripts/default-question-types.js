/**
 * Fetches default question types from the Examplary API and generates
 * a markdown reference page at docs/guides/default-question-types.md
 *
 * Usage: node scripts/default-question-types.js
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const API_URL = "https://api.examplary.ai/question-types/public";
const OUTPUT_PATH = path.join(
  __dirname,
  "..",
  "docs",
  "guides",
  "default-question-types.md"
);

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          return;
        }
        resolve(JSON.parse(data));
      });
      res.on("error", reject);
    });
  });
}

function getLocalised(value) {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") return value.en || Object.values(value)[0];
  return String(value ?? "");
}

function formatSettingType(setting) {
  let type = setting.type || "string";
  if (type === "enum" && setting.options) {
    const values = setting.options.map(
      (o) => `\`${typeof o === "string" ? o : o.value}\``
    );
    return values.join(", ");
  }
  return `\`${type}\``;
}

function formatDefault(setting) {
  if (setting.default !== undefined) return `\`${setting.default}\``;
  return "—";
}

function generateSettingsTable(settings) {
  if (!settings || settings.length === 0) return "_No configurable settings._\n";

  let md = "| Setting | Type | Default | Description |\n";
  md += "| --- | --- | --- | --- |\n";
  for (const s of settings) {
    const name = getLocalised(s.name);
    const type = formatSettingType(s);
    const def = formatDefault(s);
    const desc = s.description ? s.description.replace(/</g, '&lt;').replace(/>/g, '&gt;') : "—";
    md += `| **${name}** | ${type} | ${def} | ${desc} |\n`;
  }
  return md;
}

function generateCapabilities(qt) {
  const caps = [];
  if (qt.generation?.enabled) caps.push("AI generation");
  if (qt.grading?.enabled) caps.push("AI grading");
  if (qt.hasSimpleScoring) caps.push("Auto-scoring");
  if (qt.isAi) caps.push("AI-powered");
  if (qt.export?.qti3) caps.push("QTI 3.0 export");
  return caps;
}

function generateMarkdown(questionTypes) {
  const trusted = questionTypes
    .filter((qt) => qt.trusted === true)
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

  let md = `---
sidebar_label: Default question types
---

# Default question types

Examplary ships with a set of built-in question types that are available to all organisations. This page provides
an overview of each default question type, its capabilities, and configurable settings.

:::note Auto-generated
This page is auto-generated from the [Examplary API](/rest-api/get-question-types-public).
:::

`;

  // Detailed sections
  for (const qt of trusted) {
    const name = getLocalised(qt.name);
    const desc = getLocalised(qt.description);
    const caps = generateCapabilities(qt);

    md += `## ${name}\n\n`;
    md += `${desc}\n\n`;
    md += `**ID:** \`${qt.id}\`\n\n`;

    if (caps.length > 0) {
      md += `**Capabilities**: ${caps.join(", ")}\n\n`;
    }

    if(qt.settings?.length > 0) {
      md += "**Settings**:\n\n";
      md += generateSettingsTable(qt.settings);
      md += "\n";
    }
  }

  return md;
}

async function main() {
  console.log("Fetching question types from API...");
  const questionTypes = await fetch(API_URL);
  console.log(`Fetched ${questionTypes.length} question types.`);

  const trusted = questionTypes.filter((qt) => qt.trusted === true);
  console.log(`${trusted.length} trusted question types found.`);

  const md = generateMarkdown(questionTypes);
  fs.writeFileSync(OUTPUT_PATH, md);
  console.log(`Generated ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
