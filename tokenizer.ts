export enum TokenTypes {
  PAREN = 'paren',
  NAME = 'name',
  NUMBER = 'number',
}

export interface Token {
  type: TokenTypes;
  value: string;
}
export function tokenizer(code: string): Token[] {
  const tokens: Token[] = [];
  let current = 0;

  while (current < code.length) {
    let char = code[current];

    // Space
    const WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    // Parentheses
    if (char === '(') {
      tokens.push({
        type: TokenTypes.PAREN,
        value: char,
      });
      char = code[++current];
      continue;
    }

    if (char === ')') {
      tokens.push({
        type: TokenTypes.PAREN,
        value: char,
      });
      char = code[++current];
      continue;
    }

    // Names
    const LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';
      while (LETTERS.test(char) && current < code.length) {
        // char = code[current];
        // current++
        value += char;
        char = code[++current];
      }

      tokens.push({
        type: TokenTypes.NAME,
        value,
      });
      continue;
    }

    // Number
    const NUMBERS = /[0-9]/i;
    if (NUMBERS.test(char)) {
      let value = '';
      while (NUMBERS.test(char) && current < code.length) {
        value += char;
        char = code[++current];
      }

      tokens.push({
        type: TokenTypes.NUMBER,
        value,
      });
      continue;
    }
  }
  return tokens;
}
