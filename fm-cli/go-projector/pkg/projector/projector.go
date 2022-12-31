package projector

import (
	"encoding/json"
	"os"
	"path"
)

type Data struct {
	Projector map[string]map[string]string `json:"projector"`
}

type Projector struct {
	config *Config
	data   *Data
}

func CreateProjector(config *Config, data *Data) *Projector {
	return &Projector{
		config: config,
		data:   data,
	}
}

func (p *Projector) GetValue(key string) (string, bool) {
	curr := p.config.Pwd
	prev := ""
	result := ""
	for curr != prev {
		if value, ok := p.data.Projector[curr][key]; ok {
			result = value
			break
		}
		prev = curr
		curr = path.Dir(curr)
	}
	return result, result != ""
}

func (p *Projector) GetAllValue() map[string]string {
	curr := p.config.Pwd
	prev := ""
	results := map[string]string{}

	for curr != prev {
		if dir, ok := p.data.Projector[curr]; ok {
			for key, value := range dir {
				results[key] = value
			}
		}
		prev = curr
		curr = path.Dir(curr)
	}

	return results
}

func (p *Projector) SetValue(key, value string) {
	if _, ok := p.data.Projector[p.config.Pwd]; !ok {
		p.data.Projector[p.config.Pwd] = map[string]string{key: value}
	}
	p.data.Projector[p.config.Pwd][key] = value
}

func (p *Projector) RemoveValue(key string) {
	if _, ok := p.data.Projector[p.config.Pwd]; ok {
		delete(p.data.Projector[p.config.Pwd], key)
	}
}

func (p *Projector) Save() error {
	dir := path.Dir(p.config.Config)
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		err = os.MkdirAll(dir, 0755)
		if err != nil {
			return err
		}
	}

	contents, err := json.Marshal(p.data)
	if err != nil {
		return err
	}
	return os.WriteFile(p.config.Config, contents, 0755)
}

func defaultProjector(config *Config) *Projector {
	return &Projector{
		config: config,
		data: &Data{
			Projector: map[string]map[string]string{},
		},
	}
}

func NewProject(config *Config) *Projector {
	if _, err := os.Stat(config.Config); err == nil {
		contents, err := os.ReadFile(config.Config)
		if err != nil {
			return defaultProjector(config)
		}

		var data Data

		err = json.Unmarshal(contents, &data)
		if err != nil {
			return defaultProjector(config)
		}

		return &Projector{
			data:   &data,
			config: config,
		}
	}
	return defaultProjector(config)
}
