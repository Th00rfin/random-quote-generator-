import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const scientists = ["Einstein", "Newton", "Hawking", "Sagan", "Curie"];
let counting = 0;

const start = () => {
  if (counting >= 12) {
    console.log("You've reached 12 times, restart the console to start again.");
    rl.close();
    return;
  }
  
  rl.question(`Enter the name of a scientist for their quotes in life\n${scientists.join(', ')}\n`, (inputValue) => {
    if (!scientists.includes(inputValue)) {
      console.log(`The ${inputValue} is not present in the list of scientists.`);
    } else {
      getRandomQuote(inputValue);
    }
    counting++;
    start();
  });
};

const getRandomQuote = async (scientist) => {
  try {
    const filePath = path.resolve('quote.json');
    const data = await fs.readFile(filePath, 'utf8');
    const quotes = JSON.parse(data);
    const scientistQuotes = quotes[scientist];

    if (scientistQuotes) {
      const quoteKeys = Object.keys(scientistQuotes);
      const randomIndex = Math.floor(Math.random() * quoteKeys.length);
      const randomQuoteKey = quoteKeys[randomIndex];
      const randomQuote = scientistQuotes[randomQuoteKey];

      console.log(`"${randomQuote}" - ${scientist}`);
    } else {
      console.log(`No quotes found for ${scientist}`);
    }
  } catch (error) {
    console.error('Error reading or parsing the file:', error);
  }
};

start();
