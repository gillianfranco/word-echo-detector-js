import fs from 'fs';
import errorHandling from './errors/errorFunctions.js';
import { countWordsPerParagraph } from './index.js';

const filePath = process.argv[2];

fs.readFile(filePath, "utf8", (err, data) => {
  try {
    if (err) throw err;
    console.log(countWordsPerParagraph(data));
  } catch (err) {
    console.log(errorHandling(err));
  }
});
