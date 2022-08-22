import { createExpect } from 'vitest';
import { Token, TokenTypes } from './tokenizer';

export enum NodeTypes {
  Root = 'Program',
  Number = 'Number',
}

interface Node {
  type: NodeTypes;
}

interface RootNode extends Node {
  body: NumberNode[];
}

interface NumberNode extends Node {
  value: string;
}

function createRootNode(): RootNode {
  return {
    type: NodeTypes.Root,
    body: [],
  };
}

function createNumberNode(value: string): NumberNode {
  return {
    type: NodeTypes.Number,
    value,
  };
}

export function parser(tokens: Token[]) {
  let current = 0;
  const token = tokens[current];

  const rootNode = createRootNode();
  if (token.type === TokenTypes.NUMBER) {
    rootNode.body.push(createNumberNode(token.value));
  }
  return rootNode;
}
