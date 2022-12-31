package main

import (
	"fmt"
	"log"
	"strconv"
	"strings"
)

func getInput() string {
	return `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`
}

// type Point struct {
// 	x int
// 	y int
// }

// type Vector struct {
// 	p1 Point
// 	p2 Point
// }

// func parsePoint(pos string) Point {
// 	parts := strings.Split(pos, ",")
// 	x, err := strconv.Atoi(parts[0])
// 	if err != nil {
// 		log.Fatal("x: %d can not convert to integer", x)
// 	}
// 	y, err := strconv.Atoi(parts[1])
// 	if err != nil {
// 		log.Fatal("y: %d can not convert to integer", y)
// 	}
// 	return Point{x: x, y: y}
// }

// func parseLine(line string) Vector {
// 	parts := strings.Split(line, " -> ")

// 	return Vector{
// 		p1: parsePoint(parts[0]),
// 		p2: parsePoint(parts[1]),
// 	}

// }

// func main() {
// 	results := []Vector{}
// 	for _, line := range strings.Split(getInput(), "\n") {
// 		vector := parseLine(line)
// 		fmt.Println("%s", vector)

// 		if vector.p1.x == vector.p2.x || vector.p1.y == vector.p2.y {
// 			// fmt.Println("%s", vector)
// 			results = append(results, vector)
// 		}
// 	}
// 	fmt.Println("%s", results)
// }

type Point struct {
	x int
	y int
}

type Line struct {
	p1 Point
	p2 Point
}

func parsePoint(str string) (*Point, error) {
	parts := strings.Split(str, ",")

	x, err := strconv.Atoi(parts[0])

	if err != nil {
		return nil, err
	}

	y, err := strconv.Atoi(parts[1])

	if err != nil {
		return nil, err
	}

	result := &Point{
		x: x,
		y: y,
	}

	return result, nil
}

func parseLine(line string) (*Line, error) {
	parts := strings.Split(line, " -> ")
	p1, err := parsePoint(parts[0])

	if err != nil {
		return nil, err
	}

	p2, err := parsePoint(parts[1])

	if err != nil {
		return nil, err
	}

	return &Line{
		p1: *p1,
		p2: *p2,
	}, nil

}

func main() {
	results := []Line{}
	for _, line := range strings.Split(getInput(), "\n") {
		thing, err := parseLine(line)
		if err != nil {
			log.Fatal("Bad error")
		}

		if thing.p1.x == thing.p2.x || thing.p1.y == thing.p2.y {
			results = append(results, *thing)
		}
	}

	fmt.Printf("%+v", results)

}
