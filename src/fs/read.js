import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const read = async () => {
  const filename = path.join(import.meta.dirname, 'files', 'fileToRead.txt');
  try {
    await access(filename);
    const contents = await readFile(filename, { encoding: 'utf8' });
    console.log(contents);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw Error('FS operation failed');
    } else {
      throw error;
    }
  }
};

await read();
