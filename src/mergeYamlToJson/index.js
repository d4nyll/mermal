import { safeLoad as jsYamlSafeLoad } from 'js-yaml';
import { readFileSync } from 'fs';
import { sync as glob } from 'glob';
import extend from 'just-extend';
import flatten from 'just-flatten-it';

function getYamlInDir(dir) {
  return glob(`${dir}/**/*.yaml`);
}

function getYamlInDirs(dirs) {
  return Promise.all(dirs.map(async dir => getYamlInDir(dir)))
    .then(flatten);
}

function loadYaml(path) {
  return jsYamlSafeLoad(readFileSync(path, 'utf8')) || {};
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
    filePaths.forEach((file) => {
      const fileContent = loadYaml(file);
      extend(true, baseJson, fileContent);
    });
    // Get all the sub files
    return baseJson;
  } catch (e) {
    process.stdout.write(`${e}\n`);
  }
  return undefined;
}

export default mergeYamlToJson;
