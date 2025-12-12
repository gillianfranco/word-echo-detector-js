export function countWordsPerParagraph(text) {
  const paragraphs = splitParagraphs(text);
  const wordCount = paragraphs.flatMap((p) => {
    if (!p) return [];
    return countWords(p);
  });

  const normalizedWordCount = [];

  for (const paragraph of wordCount) {
    for (const [word, repetitions] of Object.entries(paragraph)) {
      if (repetitions == 1) continue;
      const keyValue = {};
      keyValue[word] = repetitions;
      normalizedWordCount.push(keyValue);
    }
  }

  return normalizedWordCount;
}

function countWords(text) {
  const wordsList = text.split(" ");
  const result = {};

  wordsList.forEach((word) => {
    const sanitizedWord = sanitizeWord(word);
    if (word.length >= 3) {
      result[sanitizedWord] = (result[sanitizedWord] || 0) + 1;
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
