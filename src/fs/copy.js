import { access, cp } from 'node:fs/promises';
import path from 'node:path';

const copy = async () => {
  const src = path.join(import.meta.dirname, 'files');
  const dest = path.join(import.meta.dirname, 'files_copy');

  try {
    await access(dest);
    throw Error('FS operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        await access(src);
        await cp(src, dest, { recursive: true });
      } catch (error) {
        throw Error('FS operation failed');
      }
    } else {
      throw error;
    }
  }
};

await copy();
