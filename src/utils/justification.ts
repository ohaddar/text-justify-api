export function justifyText(text: string, lineLength: number = 80): string {
  const words = text.trim().split(/\s+/);
  const justifiedLines: string[] = [];
  let wordsInCurrentLine: string[] = [];
  let charsInCurrentLine = 0;

  for (const word of words) {
    if (
      charsInCurrentLine + word.length + wordsInCurrentLine.length >
      lineLength
    ) {
      if (wordsInCurrentLine.length > 0) {
        justifiedLines.push(justifyLine(wordsInCurrentLine, lineLength));
        wordsInCurrentLine = [];
        charsInCurrentLine = 0;
      }
    }

    wordsInCurrentLine.push(word);
    charsInCurrentLine += word.length;
  }

  if (wordsInCurrentLine.length > 0) {
    justifiedLines.push(wordsInCurrentLine.join(" "));
  }

  return justifiedLines.join("\n");
}

function justifyLine(words: string[], targetLength: number): string {
  if (words.length === 1) {
    return words[0];
  }

  const totalWordChars = words.reduce((sum, word) => sum + word.length, 0);
  const spacesNeeded = targetLength - totalWordChars;
  const gapsBetweenWords = words.length - 1;
  const spacesPerGap = Math.floor(spacesNeeded / gapsBetweenWords);
  const remainingSpaces = spacesNeeded % gapsBetweenWords;

  let justifiedLine = "";
  for (let i = 0; i < words.length; i++) {
    justifiedLine += words[i];
    if (i < words.length - 1) {
      const spacesToAdd = spacesPerGap + (i < remainingSpaces ? 1 : 0);
      justifiedLine += " ".repeat(spacesToAdd);
    }
  }

  return justifiedLine;
}

export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}
