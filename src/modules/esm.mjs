import { readFile } from 'fs/promises';
import { createServer as createServerHttp } from 'http';
import { release, version } from 'os';
import path from 'path';

import './files/c.js';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const loadJsonFile = async (path) => {
  const content = await readFile(path, 'utf-8');
  return JSON.parse(content);
};

const random = Math.random();

export let unknownObject;

if (random > 0.5) {
  unknownObject = await loadJsonFile(__dirname + '/files/a.json');
} else {
  unknownObject = await loadJsonFile(__dirname + '/files/b.json');
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

export const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});
