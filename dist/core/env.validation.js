"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const lodash_1 = require("lodash");
const env_entity_1 = require("../entities/common/env.entity");
const envValidation = (config) => {
    const validatedConfig = (0, class_transformer_1.plainToInstance)(env_entity_1.EnvironmentVariableEntity, config, { enableImplicitConversion: true });
    const errors = (0, class_validator_1.validateSync)(validatedConfig, {
        skipMissingProperties: false,
    });
    if (!(0, lodash_1.isEmpty)(errors)) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
};
exports.default = envValidation;
//# sourceMappingURL=env.validation.js.map