function getInput() {
  return `forward 5
down 5
forward 8
up 3
down 8
forward 2`;
}

interface Point {
  x: number;
  y: number;
}

function parseLine(line: string): Point {
  const parts = line.split(" ");
  const amount: number = +parts[1];
  if (parts[0] === "down") {
    return { x: 0, y: amount };
  } else if (parts[0] === "up") {
    return { x: 0, y: -amount };
  }
  return { x: amount, y: 0 };
}

function main() {
  const pos = getInput()
    .split("\n")
    .map(parseLine)
    .reduce(
      (acc, point) => {
        acc.x += point.x;
        acc.y += point.y;
        return { x: acc.x, y: acc.y };
      },
      { x: 0, y: 0 },
    );
  console.log("distance", pos.x * pos.y);
}

main();

export {};
