import { createReadStream, createWriteStream } from 'node:fs';
import { rm } from 'node:fs/promises';
import path from 'node:path';
import { createGzip } from 'node:zlib';

const compress = async () => {
  const filename = path.join(
    import.meta.dirname,
    'files',
    'fileToCompress.txt'
  );
  const archive = path.join(import.meta.dirname, 'files', 'archive.gz');

  const input = createReadStream(filename);
  const output = createWriteStream(archive);

  const gzip = createGzip();

  input.pipe(gzip).pipe(output);
  rm(filename);
};

await compress();
