import { justifyText, countWords } from "../justification";

describe("justifyText", () => {
  it("should justify text to 80 characters per line", () => {
    const input =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    const result = justifyText(input);
    const lines = result.split("\n");

    expect(lines.length).toBeGreaterThan(1);
    for (let i = 0; i < lines.length - 1; i++) {
      expect(lines[i].length).toBe(80);
    }
  });

  it("should leave last line left-aligned", () => {
    const input = "This is a test.";
    const result = justifyText(input);

    expect(result).toBe("This is a test.");
  });

  it("should handle multiple spaces between words", () => {
    const input = "Hello    world    test";
    const result = justifyText(input);

    expect(result).toContain("Hello");
    expect(result).toContain("world");
    expect(result).toContain("test");
  });

  it("should preserve newlines when input contains multiple lines", () => {
    const input =
      "This is the first line.\nThis is the second line.\nThis is the third line.";
    const result = justifyText(input);
    const lines = result.split("\n");

    expect(lines.length).toBeGreaterThan(1);
    expect(result).toContain("\n");
  });

  it("should handle a single word longer than 80 characters", () => {
    const veryLongWord = "a".repeat(100);
    const result = justifyText(veryLongWord);
    const lines = result.split("\n");

    expect(lines.length).toBeGreaterThan(1);
    expect(lines[0].length).toBeLessThanOrEqual(80);
  });
});

describe("countWords", () => {
  it("should count words correctly", () => {
    expect(countWords("Hello world")).toBe(2);
    expect(countWords("This is a test")).toBe(4);
  });

  it("should handle multiple and extra spaces", () => {
    expect(countWords("  Hello    world  ")).toBe(2);
    expect(countWords("")).toBe(0);
  });
});
