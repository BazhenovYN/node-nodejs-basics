import { createWriteStream } from 'node:fs';
import path from 'node:path';

const write = async () => {
  const filename = path.join(import.meta.dirname, 'files', 'fileToWrite.txt');

  const stream = createWriteStream(filename);
  process.stdin.pipe(stream);

  console.log('Enter text. Press Ctrl+C to stop.');

  process.on('SIGINT', () => {
    stream.end();
  });
};

await write();
