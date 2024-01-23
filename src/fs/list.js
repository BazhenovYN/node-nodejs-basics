import { access, readdir } from 'node:fs/promises';
import path from 'node:path';

const list = async () => {
  const folder = path.join(import.meta.dirname, 'files');
  try {
    await access(folder);
    const files = await readdir(folder);
    console.log(files);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw Error('FS operation failed');
    } else {
      throw error;
    }
  }
};

await list();
