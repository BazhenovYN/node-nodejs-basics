import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { createGunzip } from 'node:zlib';

const decompress = async () => {
  const filename = path.join(
    import.meta.dirname,
    'files',
    'fileToCompress.txt'
  );
  const archive = path.join(import.meta.dirname, 'files', 'archive.gz');

  const input = createReadStream(archive);
  const output = createWriteStream(filename);

  const gunzip = createGunzip();

  input.pipe(gunzip).pipe(output);
};

await decompress();
