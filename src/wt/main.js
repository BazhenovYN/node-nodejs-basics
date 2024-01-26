import { availableParallelism } from 'node:os';
import path from 'node:path';
import { Worker } from 'node:worker_threads';

const performCalculations = async () => {
  const promises = [];
  const n = availableParallelism();

  for (let i = 1; i <= n; i++) {
    const promise = new Promise((resolve, reject) => {
      const worker = new Worker(path.join(import.meta.dirname, 'worker.js'), {
        workerData: n + i,
      });
      worker.on('message', (data) => resolve(data));
      worker.on('error', reject);
    });
    promises.push(promise);
  }

  const results = await Promise.allSettled(promises);
  const values = results.map((result) => {
    if (result.status === 'fulfilled') {
      return { status: 'resolved', data: result.value };
    } else {
      return { status: 'error', data: null };
    }
  });
  console.log(values);
};

await performCalculations();
