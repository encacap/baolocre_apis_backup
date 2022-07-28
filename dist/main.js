"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const response_interceptor_1 = require("./core/response.interceptor");
const validation_pipe_1 = require("./core/validation.pipe");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('PORT');
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    app.useGlobalInterceptors(new response_interceptor_1.TransformInterceptor());
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map