[![Known Vulnerabilities](https://snyk.io/test/github/d4nyll/mermal/badge.svg)](https://snyk.io/test/github/d4nyll/mermal)
[![Build Status](https://travis-ci.org/d4nyll/mermal.svg?branch=master)](https://travis-ci.org/d4nyll/mermal)
[![Greenkeeper badge](https://badges.greenkeeper.io/d4nyll/mermal.svg)](https://greenkeeper.io/)

Merges one or more YAML files into a base file.

## Usage

`mermal` is available on NPM.

[![NPM](https://nodei.co/npm/mermal.png?compact=true)](https://nodei.co/npm/mermal/)

`mermal` provides an <abbr title="Application programming interface">API</abbr> as well as a <abbr title="Command-line interface">CLI</abbr>.

### Install

```
# Locally
$ yarn add mermal   # Using yarn
$ npm install mermal    # Using npm

# Or globally
$ yarn global add mermal   # Using yarn
$ npm install -g mermal    # Using npm
```

### API

All API methods returns with a promise.

#### Example

```
import * as merge from 'mermal';

const base = `a:
  b1: b1
  b2: b2`;

const override = `a:
  b1: b3
c:
  d1: d1`;

merge.toYaml(base, override)
  .then(console.log);

/**
 * Log will read:
    a:
      b1: b3
      b2: b2
    c:
      d1: d1
 */

```

#### Available Methods

##### `toFile`
##### `toJson`
##### `toYaml`

### CLI

#### Example

```
$ mermal -b base.yaml -s sub/ -o out.yaml
```

#### Options

```
-b, --base <baseFile>     Path to the base YAML file where other files will be merged into
-o, --out <outFile>       Path to the YAML file that will be exported to. It will override any existing files
-s, --search <searchDir>  A directory that will be searched for
-h, --help                output usage information
```

See `mermal --help` for more options.

## Comparison with other packages

* [`merge-yaml`](https://github.com/skapoor/merge-yaml)
  * Lacks extensive testing
  * Throws error if the file could not be found
  * Must specify the path of every file
* [`swagger-yaml`](https://github.com/idlerun/swagger-yaml)
  * Not available as a CLI
  * Opinionated about where you place your source files

## TODO

* Improve Tests
* More tests
* Handle edge cases
