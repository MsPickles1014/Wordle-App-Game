import { Wordle, GREEN, YELLOW, BLACK } from "./index.js";
import { describe, it, expect } from "vitest";



describe("Wordle", () => {
  it("if guess has a different number of letters than wordle, it should return an empty array", () => {
    const wordle = new Wordle("alert");
    const result = wordle.checkWord("boom");
    expect(result).toEqual([]);
  });

  it("if guess matches the wordle, return array of all greens", () => {
    const wordle = new Wordle("alert");
    const result = wordle.checkWord("alert");
    expect(result).toEqual([GREEN, GREEN, GREEN, GREEN, GREEN]);
  });

  it("if first letter is in the right position, return green for that position", () => {
    const wordle = new Wordle("alert");
    const result = wordle.checkWord("abbbb");
    expect(result).toEqual([GREEN, BLACK, BLACK, BLACK, BLACK]);
  });

  it("if last letter is in the right position, return green for that position", () => {
    const wordle = new Wordle("alerts");
    const result = wordle.checkWord("bbbbbs");
    expect(result).toEqual([BLACK, BLACK, BLACK, BLACK, BLACK, GREEN]);
  });

  it("if a letter exists but in the wrong position, return yellow", () => {
    const wordle = new Wordle("alert");
    const result = wordle.checkWord("bbabb");
    expect(result).toEqual([BLACK, BLACK, YELLOW, BLACK, BLACK]);
  });

  it("if a letter exists only once in the wordle, return black for additional occurrences", () => {
    const wordle = new Wordle("alert");
    const result = wordle.checkWord("abbab");
    expect(result).toEqual([GREEN, BLACK, BLACK, BLACK, BLACK]);
  });

  it("if two of the same letter exist in the wordle and in the guess", () => {
    const wordle = new Wordle("alera");
    const result = wordle.checkWord("abbab");
    expect(result).toEqual([GREEN, BLACK, BLACK, YELLOW, BLACK]);
  });

  it("if two of the same letter exist in the guess but only one in the wordle, return the second occurrence as black", () => {
    const wordle = new Wordle("alert");
    const result = wordle.checkWord("babab");
    expect(result).toEqual([BLACK, YELLOW, BLACK, BLACK, BLACK]);
  });

  it("if no letters are part of the wordle, return all black", () => {
    const wordle = new Wordle("alert");
    const result = wordle.checkWord("bbbbb");
    expect(result).toEqual([BLACK, BLACK, BLACK, BLACK, BLACK]);
  });

  describe("letterRepeatedInGuess", () => {
    it("guess word has no repeated letters", () => {
      const wordle = new Wordle("alert");
      const result = wordle.letterRepeatedInGuess("abcde", 0);
      expect(result).toEqual(false);
    });

    it("guess word has repeated letters but only one exists in wordle", () => {
      const wordle = new Wordle("alert");
      const result = wordle.letterRepeatedInGuess("abate", 2);
      expect(result).toEqual(true);
    });

    it("guess word has repeated letters but only one exists in wordle (different index)", () => {
      const wordle = new Wordle("alert");
      const result = wordle.letterRepeatedInGuess("abate", 0);
      expect(result).toEqual(false);
    });
  });
});
