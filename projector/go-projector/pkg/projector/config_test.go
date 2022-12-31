package projector_test

import (
	"reflect"
	"testing"

	"example.com/go-projector/pkg/projector"
)

func getOpts(args []string) *projector.Opts {
	opts := &projector.Opts{
		Args:   args,
		Config: "",
		Pwd:    "",
	}
	return opts

}

func testConfig(args []string, excepted []string, operation projector.Operation, t *testing.T) {
	opts := getOpts(args)
	config, err := projector.NewConfig(opts)

	if err != nil {
		t.Errorf("NewConfig returned error: %v", err)
	}

	if config.Operation != operation {
		t.Errorf("NewConfig did not set Operation but got %+v", config.Operation)
	}

	if !reflect.DeepEqual(config.Args, excepted) {
		t.Errorf("NewConfig set Args but got %+v", config.Args)
	}
}

func TestProject(t *testing.T) {
	testConfig([]string{}, []string{}, projector.Print, t)

}

func TestProjectPrintKey(t *testing.T) {
	testConfig([]string{"foo"}, []string{"foo"}, projector.Print, t)
}

func TestProjectAdd(t *testing.T) {
	testConfig([]string{"add", "foo", "bar"}, []string{"foo", "bar"}, projector.Add, t)
}

func TestProjectRemove(t *testing.T) {
	testConfig([]string{"rm", "bar"}, []string{"bar"}, projector.Remove, t)
}
