import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// Include new, unignored files so this also works before the release commit.
const files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const available = new Set(files);
const errors = [];
let count = 0;
for (const file of files.filter(file => /\.(tsx?|css)$/.test(file) && file.startsWith('src/'))) {
    const source = fs.readFileSync(file, 'utf8');
    for (const match of source.matchAll(/(?:from\s*|import\s*)['"]([^'"]+\.(?:webp|jpe?g|png|svg))['"]/gi)) {
        const asset = path.posix.normalize(path.posix.join(path.posix.dirname(file), match[1]));
        count++;
        if (!available.has(asset) || !fs.existsSync(asset)) errors.push(`${file}: ${asset} is missing, ignored, or has incorrect case`);
    }
}
if (!available.has('public/favicon.svg')) errors.push('The public favicon is missing from the source files');
if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
} else console.log(`Verified ${count} asset imports against deployable source files.`);
