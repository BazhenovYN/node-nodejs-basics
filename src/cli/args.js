const parseArgs = () => {
  let currentArgName;
  const result = process.argv
    .slice(2)
    .reduce((acc, curr) => {
      if (currentArgName) {
        acc.push(`${currentArgName} is ${curr}`);
        currentArgName = '';
      }
      if (curr.startsWith('--')) {
        currentArgName = curr.slice(2);
      }
      return acc;
    }, [])
    .join(', ');
  console.log(result);
};

parseArgs();
