package main

import (
	"encoding/json"
	"fmt"
	"log"

	"example.com/go-projector/pkg/projector"
)

func main() {
	opts, err := projector.GetOpts()
	if err != nil {
		log.Fatalf("BAD Error: %s", err)
	}
	config, err := projector.NewConfig(opts)
	if err != nil {
		log.Fatalf("BAD Error: %s", err)
	}

	proj := projector.NewProject(config)

	if config.Operation == projector.Print {
		if len(config.Args) == 0 {
			data := proj.GetAllValue()
			jsonString, err := json.Marshal(data)
			if err != nil {
				log.Fatalf("this line should never be reached %v\n", err)
			}
			fmt.Printf("jsonString: %v\n", jsonString)
		} else if value, ok := proj.GetValue(config.Args[0]); ok {
			fmt.Printf("%v\n", value)
		}
	}

	if config.Operation == projector.Add {
		proj.SetValue(config.Args[0], config.Args[1])
		proj.Save()
	}

	if config.Operation == projector.Remove {
		proj.RemoveValue(config.Args[0])
		proj.Save()
	}
}
