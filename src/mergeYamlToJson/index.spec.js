import { safeLoad as loadYaml } from 'js-yaml';
import { readFileSync } from 'fs';
import merge from '.';

function loadTestCase(name) {
  let baseFilePath,
    srcDirPath,
    expected;
  const testCasePath = `${__dirname}/../../test/cases/${name}`;
  const testCaseSrcPath = `${testCasePath}/src`;

  try {
    baseFilePath = `${testCaseSrcPath}/base.yaml`;
    srcDirPath = testCaseSrcPath;
    expected = loadYaml(readFileSync(`${testCasePath}/expected.yaml`, 'utf8'));
  } catch (e) {
    console.log(e);
  }

  return {
    baseFilePath,
    srcDirPath,
    expected,
  };
}

test('Handles empty YAML files as empty objects', async () => {
  const { baseFilePath, srcDirPath, expected } = loadTestCase('empty');
  await expect(merge(baseFilePath, srcDirPath)).resolves.toEqual(expected);
});

test('Merges two YAML files together', async () => {
  const { baseFilePath, srcDirPath, expected } = loadTestCase('simple');
  await expect(merge(baseFilePath, srcDirPath)).resolves.toEqual(expected);
});

test('Merges multiple YAML files together', async () => {
  const { baseFilePath, srcDirPath, expected } = loadTestCase('multiple');
  await expect(merge(baseFilePath, srcDirPath)).resolves.toEqual(expected);
});

test('Merges multiple YAML files, from different directories, together', async () => {
  const { baseFilePath, srcDirPath, expected } = loadTestCase('multiple');
  const srcDir1 = `${srcDirPath}/articles`;
  const srcDir2 = `${srcDirPath}/users`;
  await expect(merge(baseFilePath, [srcDir1, srcDir2])).resolves.toEqual(expected);
});
