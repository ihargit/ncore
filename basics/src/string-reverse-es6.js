import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
});

console.log(`
Please, input some text to have it reversed
(CTRL-C for exit):
`);

rl.on('line', (input) => {
  console.log(`${input.split('').reverse().join('')}\n`);
});
