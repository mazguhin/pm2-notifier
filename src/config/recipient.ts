import {readFileSync} from 'fs';
import {join} from 'path';

import * as yaml from 'js-yaml';
import {registerAs} from "@nestjs/config";

const YAML_CONFIG_FILENAME = 'recipients.yaml';

export default registerAs('recipients', () => {
    return yaml.load(
        readFileSync(join(__dirname, '../../', YAML_CONFIG_FILENAME), 'utf8'),
    ) as Record<string, any>;
});
