function getInput(): string {
  return `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;
}

interface Point {
  x: number;
  y: number;
}

interface Vector {
  p1: Point;
  p2: Point;
}

function parsePoint(pos: string): Point {
  const parts = pos.split(",");
  return { x: +parts[0], y: +parts[1] };
}

function parseLine(line: string): Vector {
  const parts = line.split(" -> ");
  return {
    p1: parsePoint(parts[0]),
    p2: parsePoint(parts[1]),
  };
}

function main() {
  const results = getInput()
    .split("\n")
    .map(parseLine)
    .filter(({ p1, p2 }) => {
      return p1.x === p2.x || p1.y === p2.y;
    });
  console.log("results:", results);
}

main();

export {};
