'use strict';

var _jsYaml = require('js-yaml');

var _fs = require('fs');

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadTestCase(name) {
  let baseFilePath, srcDirPath, expected;
  const testCasePath = `${__dirname}/../test/cases/${name}`;
  const testCaseSrcPath = `${testCasePath}/src`;

  try {
    baseFilePath = `${testCaseSrcPath}/base.yaml`;
    srcDirPath = testCaseSrcPath;
    expected = (0, _jsYaml.safeLoad)((0, _fs.readFileSync)(`${testCasePath}/expected.yaml`, 'utf8'));
  } catch (e) {
    console.log(e);
  }

  return {
    baseFilePath,
    srcDirPath,
    expected
  };
}

test('Handles empty YAML files as empty objects', async () => {
  const { baseFilePath, srcDirPath, expected } = loadTestCase('empty');
  await expect((0, _2.default)(baseFilePath, srcDirPath)).resolves.toEqual(expected);
});

test('Merges two YAML files together', async () => {
  const { baseFilePath, srcDirPath, expected } = loadTestCase('simple');
  await expect((0, _2.default)(baseFilePath, srcDirPath)).resolves.toEqual(expected);
});

test('Merges multiple YAML files together', async () => {
  const { baseFilePath, srcDirPath, expected } = loadTestCase('multiple');
  await expect((0, _2.default)(baseFilePath, srcDirPath)).resolves.toEqual(expected);
});

test('Merges multiple YAML files, from different directories, together', async () => {
  const { baseFilePath, srcDirPath, expected } = loadTestCase('multiple');
  const srcDir1 = `${srcDirPath}/articles`;
  const srcDir2 = `${srcDirPath}/users`;
  await expect((0, _2.default)(baseFilePath, [srcDir1, srcDir2])).resolves.toEqual(expected);
});