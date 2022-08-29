import { it, describe, expect } from 'vitest';
import { codegen } from './codegen';
import { NodeTypes } from './parser';

describe('codegen', () => {
  it('codegen', () => {
    const ast = {
      type: NodeTypes.Root,
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'add',
            },
            arguments: [
              {
                type: 'NumberLiteral',
                value: '2',
              },
              {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'subtract',
                },
                arguments: [
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
        },
      ],
    };
    expect(codegen(ast)).toMatchInlineSnapshot('"add(2, subtract(4, 2));"');
  });

  it('two statement', () => {
    const ast = {
      type: NodeTypes.Root,
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'add',
            },
            arguments: [
              {
                type: 'NumberLiteral',
                value: '2',
              },
              {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'subtract',
                },
                arguments: [
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'add',
            },
            arguments: [
              {
                type: 'NumberLiteral',
                value: '2',
              },
              {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'subtract',
                },
                arguments: [
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
        },
      ],
    };
    expect(codegen(ast)).toMatchInlineSnapshot(
      '"add(2, subtract(4, 2));add(2, subtract(4, 2));"',
    );
  });
});
