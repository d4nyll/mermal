'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _jsYaml = require('js-yaml');

var _mergeYamlToJson = require('./mergeYamlToJson');

var _mergeYamlToJson2 = _interopRequireDefault(_mergeYamlToJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function mergeYamlToFile(baseYamlPath, outFile, searchDirs) {
  const finalJson = await (0, _mergeYamlToJson2.default)(baseYamlPath, searchDirs);
  const finalYaml = (0, _jsYaml.safeDump)(finalJson);
  (0, _fs.writeFileSync)(outFile, finalYaml);
}

exports.default = mergeYamlToFile;