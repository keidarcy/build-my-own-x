function getInput(): string {
  return `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`;
}

function main() {
  let count = 0;
  getInput()
    .split("\n")
    .forEach((line, index) => {
      if (line[(index * 3) % line.length] === "#") {
        count++;
      }
    });
  console.log("count:", count);
}

main();

export {};
