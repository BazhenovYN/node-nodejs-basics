import { access, rm } from 'node:fs/promises';
import path from 'node:path';

const remove = async () => {
  const filename = path.join(import.meta.dirname, 'files', 'fileToRemove.txt');
  try {
    await access(filename);
    await rm(filename);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw Error('FS operation failed');
    } else {
      throw error;
    }
  }
};

await remove();
