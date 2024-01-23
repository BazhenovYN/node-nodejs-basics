import { access, writeFile } from 'node:fs/promises';
import path from 'node:path';

const create = async () => {
  const filename = path.join(import.meta.dirname, 'files', 'fresh.txt');
  const data = 'I am fresh and young';

  try {
    await access(filename);
    throw Error('FS operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeFile(filename, data);
    } else {
      throw error;
    }
  }
};

await create();
