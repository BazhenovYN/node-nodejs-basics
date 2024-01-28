import { spawn } from 'node:child_process';
import path from 'node:path';

const spawnChildProcess = async (args) => {
  const script = path.join(import.meta.dirname, 'files', 'script.js');
  const child = spawn('node', [script, ...args]);

  child.stdout.on('data', (data) => {
    console.log(`Received from child process: ${data}`);
  });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.on('close', (code) => console.log(`Child process exited`));
};

spawnChildProcess([1, 2, 3, 4, 5]);
