export const GREEN = "g";
export const YELLOW = "y";
export const BLACK = "b";

export class Wordle {
  word;
  constructor(word) {
    this.word = word;
  }

  checkWord(guess) {
    if (guess.length !== this.word.length) {
      return [];
    }
    if (guess === this.word) {
      return [GREEN, GREEN, GREEN, GREEN, GREEN];
    }
    let result = [];

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === this.word[i]) {
        result.push(GREEN);
      } else if (this.word.includes(guess[i])) {
        if (this.letterRepeatedInGuess(guess, i)) {
          result.push(BLACK);
        } else {
          result.push(YELLOW);
        }
      } else {
        result.push(BLACK);
      }
    }
    return result;
  }
  
  letterRepeatedInGuess(guess, index) {
    let charCountInGuess = [];
    let charCountInWordle = [];

    for (let i = 0; i < guess.length; i++) {
      if (
