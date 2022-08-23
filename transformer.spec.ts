import { describe, it, expect } from 'vitest';
import { NodeTypes, RootNode } from './parser';
import { transformer } from './transformer';

describe('transformer', () => {
  it('transformer', () => {
    const ast: RootNode = {
      type: NodeTypes.Root,
      body: [
        {
          type: NodeTypes.CallExpression,
          name: 'add',
          params: [
            {
              type: NodeTypes.NumberLiteral,
              value: '2',
            },
            {
              type: NodeTypes.CallExpression,
              name: 'subtract',
              params: [
                {
                  type: NodeTypes.NumberLiteral,
                  value: '4',
                },
                {
                  type: NodeTypes.NumberLiteral,
                  value: '2',
                },
              ],
            },
          ],
        },
      ],
    };

    const transformedAST = {
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

    expect(transformer(ast)).toEqual(transformedAST);
  });
});
