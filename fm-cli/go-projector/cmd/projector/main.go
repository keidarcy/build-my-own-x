package main

import (
	"fmt"
	"log"

	"example.com/go-projector/pkg/projector"
)

func main() {
	opts, err := projector.GetOpts()
	if err != nil {
		log.Fatalf("BAD Error: %s", err)
	}
	fmt.Printf("opts: %+v\n", opts)

	config, err := projector.NewConfig(opts)
	if err != nil {
		log.Fatalf("BAD Error: %s", err)
	}
	fmt.Printf("config: %+v\n", config)
}
