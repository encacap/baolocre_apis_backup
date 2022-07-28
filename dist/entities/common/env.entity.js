"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentVariableEntity = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../../interfaces/enums");
class EnvironmentVariableEntity {
    NODE_ENV;
    PORT;
    MONGO_URL;
    JWT_SECRET;
    JWT_EXPIRATION_MINUTES;
    CLOUDFLARE_ACCOUNT_ID;
    CLOUDFLARE_IMAGES_API_KEY;
    CLOUDFLARE_IMAGES_API_URL;
}
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.Environment),
    __metadata("design:type", String)
], EnvironmentVariableEntity.prototype, "NODE_ENV", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EnvironmentVariableEntity.prototype, "PORT", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariableEntity.prototype, "MONGO_URL", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariableEntity.prototype, "JWT_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EnvironmentVariableEntity.prototype, "JWT_EXPIRATION_MINUTES", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariableEntity.prototype, "CLOUDFLARE_ACCOUNT_ID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariableEntity.prototype, "CLOUDFLARE_IMAGES_API_KEY", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariableEntity.prototype, "CLOUDFLARE_IMAGES_API_URL", void 0);
exports.EnvironmentVariableEntity = EnvironmentVariableEntity;
//# sourceMappingURL=env.entity.js.map