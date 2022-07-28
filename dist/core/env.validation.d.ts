import { EnvironmentVariableEntity } from 'src/entities/common/env.entity';
declare const envValidation: (config: Record<string, number | string>) => EnvironmentVariableEntity;
export default envValidation;
