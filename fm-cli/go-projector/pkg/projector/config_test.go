package projector_test

import (
	// "reflect"
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

func testConfig(args []string, operation projector.Operation, t *testing.T) {
	opts := getOpts(args)
	config, err := projector.NewConfig(opts)

	if err != nil {
		t.Errorf("NewConfig returned error: %v", err)
	}

	if config.Operation != operation {
		t.Errorf("NewConfig did not set Operation but got %+v", config.Operation)
	}

}

func TestProject(t *testing.T) {
	testConfig([]string{}, projector.Print, t)

}

func TestProjectPrintKey(t *testing.T) {
	testConfig([]string{"foo"}, projector.Print, t)
}

func TestProjectAdd(t *testing.T) {
	testConfig([]string{"add", "foo", "bar"}, projector.Add, t)
}

func TestProjectRemove(t *testing.T) {
	testConfig([]string{"remove", "bar"}, projector.Remove, t)
}
