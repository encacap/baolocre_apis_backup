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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs = require("bcryptjs");
const lodash_1 = require("lodash");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    userService;
    jwtService;
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            return null;
        }
        const isMatched = await this.comparePassword(password, user.password);
        if (!isMatched) {
            return null;
        }
        return user;
    }
    async login(user) {
        const authToken = await this.generateAuthToken(user);
        return {
            user,
            authToken,
        };
    }
    async register(user) {
        const hashedPassword = await this.hashPassword(user.password);
        const existingUser = await this.userService.findOneByEmail(user.email);
        if (existingUser) {
            throw new common_1.UnauthorizedException();
        }
        const newUser = await this.userService.create({
            ...user,
            password: hashedPassword,
        });
        const authToken = await this.generateAuthToken(newUser);
        return {
            user: (0, lodash_1.omit)(newUser, 'password'),
            authToken,
        };
    }
    async generateAuthToken(user) {
        return this.jwtService.sign({
            id: user.id,
            email: user.email,
        });
    }
    async comparePassword(inputPassword, userPassword) {
        return bcryptjs.compare(inputPassword, userPassword);
    }
    hashPassword(password) {
        return bcryptjs.hash(password, 10);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map