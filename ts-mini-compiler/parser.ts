import { Token, TokenTypes } from './tokenizer';

export enum NodeTypes {
  Root = 'Root',
  NumberLiteral = 'NumberLiteral',
  CallExpression = 'CallExpression',
}

interface Node {
  type: NodeTypes;
}

export interface RootNode extends Node {
  type: NodeTypes.Root;
  body: ChildNode[];
  context?: ChildNode[];
}

interface NumberNode extends Node {
  type: NodeTypes.NumberLiteral;
  value: string;
}

interface CallExpressionNode extends Node {
  type: NodeTypes.CallExpression;
  name: string;
  params: ChildNode[];
  context?: ChildNode[];
}

export type ChildNode = NumberNode | CallExpressionNode;

export type ParentNode = RootNode | CallExpressionNode;

function createRootNode(): RootNode {
  return {
    type: NodeTypes.Root,
    body: [],
  };
}

function createNumberNode(value: string): NumberNode {
  return {
    type: NodeTypes.NumberLiteral,
    value,
  };
}

function createCallExpressionNode(name: string): CallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    name,
    params: [],
  };
}

export function parser(tokens: Token[]) {
  let current = 0;
  const rootNode = createRootNode();

  function walk(): ChildNode {
    let token = tokens[current];
    if (token.type === TokenTypes.NUMBER) {
      current++;
      return createNumberNode(token.value);
    }
    if (token.type === TokenTypes.PAREN && token.value === '(') {
      token = tokens[++current];
      const node: CallExpressionNode = createCallExpressionNode(token.value);

      token = tokens[++current];
      while (!(token.type === TokenTypes.PAREN && token.value === ')')) {
        node.params.push(walk());
        token = tokens[current];
      }
      current++;
      return node;
    }

    throw new Error(`unknown token: ${JSON.stringify(token)}, current: ${current}`);
  }
  while (current < tokens.length) {
    rootNode.body.push(walk());
  }
  return rootNode;
}
