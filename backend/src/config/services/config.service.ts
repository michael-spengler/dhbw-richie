import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SCHEMA } from '../schema';

interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;
  private readonly LOGGER = new Logger(ConfigService.name);

  constructor() {
    const path = '.env';
    this.LOGGER.debug(`Loading config from: ${path}`);

    this.LOGGER.debug(`Validating file`);
    /* const parsed = dotenv.parse(readFileSync(path));
    const validatedEnv = this.validateEnvFile(parsed);

    this.LOGGER.debug(`Configuring enviroment`);
    this.envConfig = this.applyConfigToEnv(validatedEnv); */
  }

  public get(key: string): string {
    return process.env[key];
  }

  private validateEnvFile(envConfig: EnvConfig): EnvConfig {
    const { error, value: validatedEnvConfig } = SCHEMA.validate(envConfig);
    if (error) {
      throw new InternalServerErrorException(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
  private applyConfigToEnv(envConfig: EnvConfig): EnvConfig {
    const appliedEnv: EnvConfig = {};
    Object.keys(envConfig).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = envConfig[key];
      } else {
        this.LOGGER.debug(
          `"${key}" is already defined in \`process.env\` and will not be overwritten`
        );
      }
      appliedEnv[key] = process.env[key];
    });
    return appliedEnv;
  }
}
