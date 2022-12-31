package projector_test

import (
	"testing"

	"example.com/go-projector/pkg/projector"
)

func getData() *projector.Data {
	return &projector.Data{
		Projector: map[string]map[string]string{
			"/": {
				"foo": "bar1",
			},
			"/foo": {
				"foo": "bar2",
			},
			"/foo/bar": {
				"foo": "bar3",
				"bar": "foo3",
			},
		},
	}
}

func getProjector(pwd string, data *projector.Data) *projector.Projector {
	return projector.CreateProjector(&projector.Config{
		Args:      []string{},
		Pwd:       pwd,
		Config:    "HELLO WORLD",
		Operation: projector.Print,
	}, data)
}

func test(t *testing.T, proj *projector.Projector, key, value string) {

	v, ok := proj.GetValue(key)

	if !ok {
		t.Errorf("expected to find value %q", value)
	}

	if value != v {
		t.Errorf("Expected value to be %v, got %v", value, v)
	}

}

func TestGetValue(t *testing.T) {
	data := getData()
	p := getProjector("/foo/bar", data)
	test(t, p, "bar", "foo3")
}

func TestSetValue(t *testing.T) {
	data := getData()
	p := getProjector("/foo/bar", data)
	test(t, p, "bar", "foo3")
	p.SetValue("bar", "foo4")
	test(t, p, "bar", "foo4")
	p.SetValue("fm", "foo4")
	p = getProjector("/", data)
	test(t, p, "foo", "bar1")
}

func TestRemoveValue(t *testing.T) {
	data := getData()
	p := getProjector("/foo/bar", data)
	test(t, p, "foo", "bar3")
	p.RemoveValue("foo")
	test(t, p, "foo", "bar2")
}
