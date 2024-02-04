import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import merge from '.';

function loadTestCase(name) {
  const testCasePath = `${__dirname}/../../test/cases/${name}`;
  return {
    baseFilePath: `${testCasePath}/base.yaml`,
    overridesPath: `${testCasePath}/overrides`,
    expected: load(readFileSync(`${testCasePath}/expected.yaml`, 'utf8')),
  };
}

test('Handles empty YAML files as empty objects', async () => {
  const { baseFilePath, overridesPath, expected } = loadTestCase('empty');
  await expect(merge(baseFilePath, overridesPath)).resolves.toEqual(expected);
});

test('Merges two YAML files together', async () => {
  const { baseFilePath, overridesPath, expected } = loadTestCase('simple');
  await expect(merge(baseFilePath, overridesPath)).resolves.toEqual(expected);
});

test('Merges multiple YAML files together', async () => {
  const { baseFilePath, overridesPath, expected } = loadTestCase('multiple');
  await expect(merge(baseFilePath, overridesPath)).resolves.toEqual(expected);
});

test('Merges multiple YAML files, from different directories, together', async () => {
  const { baseFilePath, overridesPath, expected } = loadTestCase('multiple');
  const overridesDir1 = `${overridesPath}/articles`;
  const overridesDir2 = `${overridesPath}/users`;
  await expect(merge(baseFilePath, [overridesDir1, overridesDir2])).resolves.toEqual(expected);
});
