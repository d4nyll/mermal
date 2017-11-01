import { writeFileSync } from 'fs';
import { safeDump as jsonToYaml } from 'js-yaml';
import mergeYamlToJson from './mergeYamlToJson';

async function mergeYamlToFile(baseYamlPath, outFile, searchDirs) {
  const finalJson = await mergeYamlToJson(baseYamlPath, searchDirs);
  const finalYaml = jsonToYaml(finalJson);
  writeFileSync(outFile, finalYaml);
}

export default mergeYamlToFile;
