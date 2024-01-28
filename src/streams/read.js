import { createReadStream } from 'node:fs';
import path from 'node:path';
import { stdout } from 'node:process';

const read = async () => {
  const filename = path.join(import.meta.dirname, 'files', 'fileToRead.txt');
  const input = createReadStream(filename);
  input.pipe(stdout);
};

await read();
