import { access, rename as rn } from 'node:fs/promises';
import path from 'node:path';

const rename = async () => {
  const oldName = path.join(import.meta.dirname, 'files', 'wrongFilename.txt');
  const newName = path.join(import.meta.dirname, 'files', 'properFilename.md');

  try {
    await access(oldName);
    try {
      await access(newName);
      throw Error('FS operation failed');
    } catch (error) {
      if (error.code === 'ENOENT') {
        await rn(oldName, newName);
      } else {
        throw error;
      }
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw Error('FS operation failed');
    } else {
      throw error;
    }
  }
};

await rename();
