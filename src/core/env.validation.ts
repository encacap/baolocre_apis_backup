import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { isEmpty } from 'lodash';
import { EnvironmentVariableEntity } from 'src/entities/common/env.entity';

const envValidation = (config: Record<string, number | string>) => {
  const validatedConfig = plainToInstance(EnvironmentVariableEntity, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (!isEmpty(errors)) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};

export default envValidation;
