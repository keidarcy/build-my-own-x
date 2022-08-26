import { NodeTypes, RootNode } from './parser';
import { traverse } from './traverse';

export function transformer(ast: RootNode) {
  const newAst = {
    type: NodeTypes.Root,
    body: [] as any,
  };

  ast.context = newAst.body;

  traverse(ast, {
    CallExpression: {
      enter(node, parent) {
        if (node.type !== NodeTypes.CallExpression) return;
        let expression: any = {
          type: NodeTypes.CallExpression,
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        };

        node.context = expression.arguments;

        if (parent?.type !== NodeTypes.CallExpression) {
          expression = {
            type: 'ExpressionStatement',
            expression,
          };
        }

        parent?.context?.push(expression);
      },
    },
    NumberLiteral: {
      enter(node, parent) {
        if (node.type !== NodeTypes.NumberLiteral) return;
        const expression: any = {
          type: 'NumberLiteral',
          value: node.value,
        };
        parent?.context?.push(expression);
      },
    },
  });
  return newAst;
}
