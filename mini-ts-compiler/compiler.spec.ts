import { it, describe, expect } from 'vitest';
import { compiler } from './compiler';

describe('compiler', () => {
  it('compiler', () => {
    const code = '(add 2 (subtract 4 2))';
    const compiledCode = 'add(2, subtract(4, 2));';
    expect(compiler(code)).toBe(compiledCode);
  });
});
