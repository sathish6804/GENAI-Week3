const fs = require('fs');
const path = require('path');

function readFile(p) {
  return fs.readFileSync(path.resolve(p), 'utf8');
}

function extractPromptKeysFromPrompts(jsText) {
  // Robustly find the DEFAULT_PROMPTS object by locating the opening brace and
  // counting braces until the object ends. This avoids problems when template
  // strings inside the object contain sequences that confuse simple regexes.
  const startIdx = jsText.indexOf('export const DEFAULT_PROMPTS');
  if (startIdx === -1) return [];
  const braceOpenIdx = jsText.indexOf('{', startIdx);
  if (braceOpenIdx === -1) return [];
  let i = braceOpenIdx;
  let depth = 0;
  for (; i < jsText.length; i++) {
    const ch = jsText[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) break;
    }
  }
  if (depth !== 0) return [];
  const body = jsText.slice(braceOpenIdx + 1, i);
  const keys = [];
  // Match keys like KEY_NAME: ` or KEY_NAME: '\n or KEY_NAME: "..."
  const keyRegex = /^\s*([A-Z0-9_]+)\s*:\s*`/gim;
  let km;
  while ((km = keyRegex.exec(body)) !== null) {
    keys.push(km[1]);
  }
  return keys;
}

function extractReferencedKeysFromChat(jsText) {
  const refs = new Set();
  // push('KEY') usages
  const pushRegex = /push\(\s*['"]([A-Z0-9_]+)['"]\s*\)/g;
  let pm;
  while ((pm = pushRegex.exec(jsText)) !== null) refs.add(pm[1]);

  // getPrompt('KEY' ...)
  const getPromptRegex = /getPrompt\(\s*['"]([A-Z0-9_]+)['"]/g;
  while ((pm = getPromptRegex.exec(jsText)) !== null) refs.add(pm[1]);

  return Array.from(refs);
}

function main() {
  const promptsPath = path.join(__dirname, 'prompts.js');
  const chatPath = path.join(__dirname, 'chat.js');

  if (!fs.existsSync(promptsPath)) {
    console.error('prompts.js not found at', promptsPath);
    process.exit(2);
  }
  if (!fs.existsSync(chatPath)) {
    console.error('chat.js not found at', chatPath);
    process.exit(2);
  }

  const promptsText = readFile(promptsPath);
  const chatText = readFile(chatPath);

  const defined = extractPromptKeysFromPrompts(promptsText);
  const referenced = extractReferencedKeysFromChat(chatText);

  const definedSet = new Set(defined);
  const missing = referenced.filter(k => !definedSet.has(k));

  console.log('Defined prompts (count):', defined.length);
  console.log('Referenced prompts (count):', referenced.length);

  if (missing.length === 0) {
    console.log('\n✅ All referenced prompt keys are defined in prompts.js');
    process.exit(0);
  }

  console.error('\n❌ Missing prompt keys:');
  missing.forEach(k => console.error(' -', k));
  process.exit(1);
}

if (require.main === module) main();
