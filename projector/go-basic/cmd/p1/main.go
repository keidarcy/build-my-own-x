package main

import (
	"fmt"
	"log"
	"strconv"
	"strings"
)

func getInput() string {
	return `forward 5
down 5
forward 8
up 3
down 8
forward 2`
}

type Point struct {
	x int
	y int
}

func parseLine(line string) Point {
	parts := strings.Split(line, " ")
	amount, err := strconv.Atoi(parts[1])
	if err != nil {
		log.Fatal("can not covert to int %s", line)
	}
	if parts[0] == "down" {
		return Point{x: 0, y: amount}
	} else if parts[0] == "up" {
		return Point{x: 0, y: -amount}
	}
	return Point{x: amount, y: 0}
}

func main() {
	lines := strings.Split(getInput(), "\n")

	pos := Point{x: 0, y: 0}
	for _, line := range lines {
		command := parseLine(line)
		pos.x += command.x
		pos.y += command.y
	}
	fmt.Println("distance is: ", pos.x*pos.y)
}
