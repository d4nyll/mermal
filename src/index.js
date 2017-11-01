import { writeFileSync } from 'fs';
import { safeDump as jsonToYaml } from 'js-yaml';
import mergeYamlToJson from './mergeYamlToJson';

async function mergeYamlToYaml(baseYamlPath, searchDirs) {
  const finalJson = await mergeYamlToJson(baseYamlPath, searchDirs);
  return jsonToYaml(finalJson);
}

async function mergeYamlToFile(baseYamlPath, outFile, searchDirs) {
  const finalYaml = await mergeYamlToYaml(baseYamlPath, searchDirs);
  writeFileSync(outFile, finalYaml);
}

export {
  mergeYamlToFile as toFile,
  mergeYamlToJson as toJson,
  mergeYamlToYaml as toYaml,
};
