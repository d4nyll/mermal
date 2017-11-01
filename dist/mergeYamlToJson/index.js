'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsYaml = require('js-yaml');

var _fs = require('fs');

var _glob = require('glob');

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.flattendeep');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getYamlInDir(dir) {
  return (0, _glob.sync)(`${dir}/**/*.yaml`);
}

function getYamlInDirs(dirs) {
  return Promise.all(dirs.map(async dir => getYamlInDir(dir))).then(_lodash4.default);
}

function loadYaml(path) {
  return (0, _jsYaml.safeLoad)((0, _fs.readFileSync)(path, 'utf8')) || {};
}

function standardizeDirs(dirs) {
  return Array.isArray(dirs) ? dirs : [dirs];
}

async function mergeYamlToJson(baseYamlPath, searchDirs) {
  const dirs = standardizeDirs(searchDirs);

  // Get the base file
  try {
    const baseJson = loadYaml(baseYamlPath);
    const filePaths = await getYamlInDirs(dirs);
    filePaths.forEach(file => {
      const fileContent = loadYaml(file);
      (0, _lodash2.default)(baseJson, fileContent);
    });
    // Get all the sub files
    return baseJson;
  } catch (e) {
    process.stdout.write(`${e}\n`);
  }
  return undefined;
}

exports.default = mergeYamlToJson;