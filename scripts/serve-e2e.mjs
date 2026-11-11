import { build, preview } from 'vite';

const configured = process.argv[2] === 'configured';
// Dedicated builds: never bake a test endpoint into the deployable dist folder.
process.env.VITE_FORMSPREE_ENDPOINT = configured ? 'https://formspree.io/f/testform' : '';
const outDir = configured ? '.test-dist/configured' : '.test-dist/unconfigured';
await build({ mode: 'test', build: { outDir }, logLevel: 'warn' });
await preview({ build: { outDir }, preview: { host: '127.0.0.1', port: configured ? 4173 : 4174, strictPort: true } });
