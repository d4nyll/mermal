Merges one or more YAML files into a base file.

## Usage

### CLI

```
$ yarn global add mermal   # Using yarn
$ npm install -g mermal    # Using npm
```

```
$ mermal -b base.yaml -s sub/ -o out.yaml
```

## Comparison with other packages

* [`merge-yaml`](https://github.com/skapoor/merge-yaml)
  * Lacks extensive testing
  * Throws error if the file could not be found
  * Must specify the path of every file