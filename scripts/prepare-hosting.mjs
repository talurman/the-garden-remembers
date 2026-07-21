import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(projectRoot, 'public');

await rm(publicDir, { recursive: true, force: true });
await mkdir(publicDir, { recursive: true });
await cp(path.join(projectRoot, 'index.html'), path.join(publicDir, 'index.html'));
await cp(path.join(projectRoot, 'src'), path.join(publicDir, 'src'), { recursive: true });

console.log('Prepared Firebase release in public/');
