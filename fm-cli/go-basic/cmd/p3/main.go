package main

import (
	"fmt"
	"strings"
)

func getInput() string {
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
.#..#...#.#`
}

// type Thing = int

// const (
// 	Tree Thing = iota
// 	Snow
// )

func main() {
	count := 0
	for i, l := range strings.Split(getInput(), "\n") {
		if l[(i*3)%len(l)] == '#' {
			count++
		}
	}
	fmt.Printf("%d\n", count)
}
