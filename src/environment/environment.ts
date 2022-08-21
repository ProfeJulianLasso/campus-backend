/* eslint-disable prettier/prettier */
import * as path from 'path';
import { readFileSync } from 'fs';
import { load as loadYaml } from 'js-yaml';

const SCOPE = process.env.NODE_SCOPE;
const YAML_CONFIG_FILENAME = path.resolve(
  __dirname,
  !SCOPE ? 'development.yml' : `${SCOPE}.yaml`,
);

export default () => {
  return loadYaml(
    readFileSync(YAML_CONFIG_FILENAME, 'utf8')
  ) as Record<string, any>;
};
