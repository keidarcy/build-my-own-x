import { NodeTypes, RootNode, ChildNode, ParentNode } from './parser';

type VisitorFn = (node: RootNode | ChildNode, parent: ParentNode | undefined) => void;

interface VisitorOption {
  enter: VisitorFn;
  exit?: VisitorFn;
}

export type Visitor = {
  [NodeTypes.Root]?: VisitorOption;
  [NodeTypes.CallExpression]?: VisitorOption;
  [NodeTypes.NumberLiteral]?: VisitorOption;
};

export function traverse(rootNode: RootNode, visitor: Visitor) {
  function traverseArr(nodes: ChildNode[], parent: ParentNode) {
    nodes.forEach((node) => {
      traverseNode(node, parent);
    });
  }
  function traverseNode(node: RootNode | ChildNode, parent?: ParentNode) {
    const visitorObj = visitor[node.type];
    if (visitorObj) visitorObj.enter(node, parent);
    switch (node.type) {
      case NodeTypes.NumberLiteral:
        break;
      case NodeTypes.CallExpression:
        traverseArr(node.params, node);
        break;
      case NodeTypes.Root:
        traverseArr(node.body, node);
        break;
    }
    if (visitorObj && visitorObj.exit) visitorObj.exit(node, parent);
  }

  traverseNode(rootNode);
}
