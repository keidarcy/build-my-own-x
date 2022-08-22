import { describe, it, expect } from 'vitest';
import { parser } from './parser';
import { Token, TokenTypes } from './tokenizer';

describe('parser', () => {
  it.skip('parse', () => {
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
    ] as Token[];

    const ast = {
      type: 'Program',
      body: [
        {
          type: 'CallExpression',
          name: 'add',
          params: [
            {
              type: 'NumberLiteral',
              value: '2',
            },
            {
              type: 'CallExpression',
              name: 'subtract',
              params: [
                {
                  type: 'NumberLiteral',
                  value: '4',
                },
                {
                  type: 'NumberLiteral',
                  value: '2',
                },
              ],
            },
          ],
        },
      ],
    };
    const result = parser(tokens);
    expect(result).toEqual(ast);
  });

  it('number', () => {
    const tokens: Token[] = [
      {
        type: TokenTypes.NUMBER,
        value: '2',
      },
    ];
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'Number',
          value: '2',
        },
      ],
    };
    const result = parser(tokens);
    expect(result).toEqual(ast);
  });
});
