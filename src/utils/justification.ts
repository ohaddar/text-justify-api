export function justifyText(text: string, lineLength: number = 80): string {
  // Split by newlines first to preserve them
  const paragraphs = text.split("\n");
  const justifiedParagraphs = paragraphs.map((paragraph) =>
    justifyParagraph(paragraph.trim(), lineLength),
  );
  return justifiedParagraphs.join("\n");
}

function justifyParagraph(text: string, lineLength: number): string {
  if (!text) return "";

  const words = text.split(/\s+/);
  const justifiedLines: string[] = [];
  let wordsInCurrentLine: string[] = [];
  let charsInCurrentLine = 0;

  for (const word of words) {
    // If word is longer than lineLength, split it
    if (word.length > lineLength) {
      // Save current line first if it has words
      if (wordsInCurrentLine.length > 0) {
        justifiedLines.push(justifyLine(wordsInCurrentLine, lineLength));
        wordsInCurrentLine = [];
        charsInCurrentLine = 0;
      }

      // Split the long word into chunks
      let remainingWord = word;
      while (remainingWord.length > lineLength) {
        justifiedLines.push(remainingWord.substring(0, lineLength));
        remainingWord = remainingWord.substring(lineLength);
      }
      if (remainingWord.length > 0) {
        wordsInCurrentLine.push(remainingWord);
        charsInCurrentLine = remainingWord.length;
      }
      continue;
    }

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
