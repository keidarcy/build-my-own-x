package projector

import "github.com/hellflame/argparse"

type Opts struct {
	Args   []string // additional arguments
	Config string   // project cli config file path
	Pwd    string
}

func GetOpts() (*Opts, error) {
	parser := argparse.NewParser("projector", "Projector is a tool to generate a project structure from a template", &argparse.ParserConfig{
		DisableDefaultShowHelp: true,
	})

	args := parser.Strings("a", "args", &argparse.Option{
		Positional: true,
		Required:   false,
		Default:    "",
	})

	config := parser.String("c", "config", &argparse.Option{
		Required: false,
		Default:  "",
	})

	pwd := parser.String("p", "pwd", &argparse.Option{
		Required: false,
		Default:  "",
	})

	err := parser.Parse(nil)

	if err != nil {
		return nil, err
	}

	return &Opts{
		Args:   *args,
		Config: *config,
		Pwd:    *pwd,
	}, nil
}
