import { tokenizer } from './tokenizer';
import { parser } from './parser';
import { transformer } from './transformer';
import { codegen } from './codegen';

export function compiler(code: string) {
  const tokens = tokenizer(code);
  const ast = parser(tokens);
  const transformedAst = transformer(ast);
  const compileCode = codegen(transformedAst);
  return compileCode;
}
