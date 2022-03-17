import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'proj-config.yaml';

export default () => {
  const path = join(__dirname, YAML_CONFIG_FILENAME);
  const fileRead = readFileSync(path, 'utf-8');
  return yaml.load(fileRead) as Record<string, any>;
};
