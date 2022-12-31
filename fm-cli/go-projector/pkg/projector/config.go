package projector

import (
	"fmt"
	"os"
	"path"
)

type Operation = int

const (
	Print Operation = iota
	Add
	Remove
)

type Config struct {
	Args      []string
	Operation Operation

	Pwd    string
	Config string
}

func getPwd(opts *Opts) (string, error) {
	if opts.Pwd != "" {
		return opts.Pwd, nil
	}
	return os.Getwd()
}

func getConfig(opts *Opts) (string, error) {
	if opts.Config != "" {
		return opts.Config, nil
	}
	// config, err := os.UserConfigDir()
	config, err := os.UserHomeDir()
	if err != nil {
		return "", err
	}

	p := path.Join(config, ".config/projector", "projector.json")
	return p, nil
}

func getOperation(opts *Opts) Operation {
	if len(opts.Args) == 0 {
		return Print
	}

	if opts.Args[0] == "add" {
		return Add
	}

	if opts.Args[0] == "rm" {
		return Remove
	}

	return Print
}

func getArgs(opts *Opts) ([]string, error) {
	if len(opts.Args) == 0 {
		return []string{}, nil
	}

	operation := getOperation(opts)
	if operation == Add {
		if len(opts.Args) != 3 {
			return nil, fmt.Errorf("add requires 2 arguments, but got %d", len(opts.Args)-1)
		}
		return opts.Args[1:], nil
	}

	if operation == Remove {
		if len(opts.Args) != 2 {
			return nil, fmt.Errorf("remove requires 1 arguments, but got %d", len(opts.Args)-1)
		}
		return opts.Args[1:], nil
	}

	if len(opts.Args) > 1 {
		return nil, fmt.Errorf("print requires 0 or 1 arguments, but got %d", len(opts.Args)-1)
	}

	return opts.Args, nil
}

func NewConfig(opts *Opts) (*Config, error) {

	pwd, err := getPwd(opts)
	if err != nil {
		return nil, err
	}
	config, err := getConfig(opts)
	if err != nil {
		return nil, err
	}
	args, err := getArgs(opts)
	if err != nil {
		return nil, err
	}

	return &Config{
		Args:      args,
		Operation: getOperation(opts),
		Pwd:       pwd,
		Config:    config,
	}, nil
}
