import { describe, it, expect } from 'vitest';
import { tokenizer, TokenTypes } from './tokenizer';

describe('tokenizer', () => {
  it('tokenizer', () => {
    const code = `(add 2 (subtract 4 2))`;
    const tokens = [
      { type: 'paren', value: '(' },
      { type: 'name', value: 'add' },
      { type: 'number', value: '2' },
      { type: 'paren', value: '(' },
      { type: 'name', value: 'subtract' },
      { type: 'number', value: '4' },
      { type: 'number', value: '2' },
      { type: 'paren', value: ')' },
      { type: 'paren', value: ')' },
    ];
    expect(tokenizer(code)).toEqual(tokens);
  });

  it('left paren', () => {
    const code = `(`;
    const tokens = [{ type: TokenTypes.PAREN, value: '(' }];
    const result = tokenizer(code);
    expect(result).toEqual(tokens);
  });

  it('right paren', () => {
    const code = `)`;
    const tokens = [{ type: TokenTypes.PAREN, value: ')' }];
    const result = tokenizer(code);
    expect(result).toEqual(tokens);
  });

  it('add', () => {
    const code = `add`;
    const tokens = [{ type: TokenTypes.NAME, value: 'add' }];
    const result = tokenizer(code);
    expect(result).toEqual(tokens);
  });

  it('number', () => {
    const code = `432`;
    const tokens = [{ type: TokenTypes.NUMBER, value: '432' }];
    const result = tokenizer(code);
    expect(result).toEqual(tokens);
  });

  it('(add 11 2)', () => {
    const code = `(add 11 2)`;
    const tokens = [
      { type: 'paren', value: '(' },
      { type: 'name', value: 'add' },
      { type: 'number', value: '11' },
      { type: 'number', value: '2' },
      { type: 'paren', value: ')' },
    ];
    expect(tokenizer(code)).toEqual(tokens);
  });
});
