function filterOccurrences(paragraph) {
  return Object.keys(paragraph).filter((key) => paragraph[key] > 1);
}

function buildOutput(wordsList) {
  let result = '';
  wordsList.forEach((paragraph, index) => {
    const duplicateWords = filterOccurrences(paragraph).join("\n- ");

    if (duplicateWords) {
      result += `Parágrafo ${index + 1}:\n- ${duplicateWords}\n\n`;
    }
  });

  return result;
}

export { buildOutput };