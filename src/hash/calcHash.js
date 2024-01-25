import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import path from 'node:path';

const calculateHash = async () => {
  const filename = path.join(
    import.meta.dirname,
    'files',
    'fileToCalculateHashFor.txt'
  );
  const hash = createHash('sha256');

  const stream = createReadStream(filename);

  stream.on('data', (data) => {
    hash.update(data);
  });

  stream.on('end', () => {
    const hashResult = hash.digest('hex');
    console.log(`${hashResult}`);
  });
};

await calculateHash();
