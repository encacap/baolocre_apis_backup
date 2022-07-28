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
exports.GetDirectUploadURLEntity = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../../interfaces/enums");
class GetDirectUploadURLEntity {
    postType;
    postId;
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)([enums_1.ImageFolder.ESTATE, enums_1.ImageFolder.NEWS]),
    __metadata("design:type", String)
], GetDirectUploadURLEntity.prototype, "postType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], GetDirectUploadURLEntity.prototype, "postId", void 0);
exports.GetDirectUploadURLEntity = GetDirectUploadURLEntity;
//# sourceMappingURL=getDirectUploadURL.entity.js.map