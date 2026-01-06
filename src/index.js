export function countWordsPerParagraph(text) {
  const paragraphs = splitParagraphs(text);
  const wordCount = paragraphs.flatMap((p) => {
    if (!p) return [];
    return countWords(p);
  });

  // const normalizedWordCount = [];

  // for (const paragraph of wordCount) {
  //   for (const [word, repetitions] of Object.entries(paragraph)) {
  //     if (repetitions == 1) continue;
  //     const keyValue = {};
  //     keyValue[word] = repetitions;
  //     normalizedWordCount.push(keyValue);
  //   }
  // }

  // return normalizedWordCount;

  return wordCount;
}

function countWords(text) {
  const wordsList = text.split(" ");
  const result = {};

  wordsList.forEach((word) => {
    const sanitizedWord = sanitizeWord(word);
    if (word.length >= 3) {
      result[sanitizedWord] = (result[sanitizedWord] || 0) + 1; // Se já houver um valor na chave --> valor + 1; Caso contrário --> 0 + 1;
    }
  });

  return result;
}

function splitParagraphs(text) {
  return text.toLowerCase().split("\n");
}

function sanitizeWord(word) {
  return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}
