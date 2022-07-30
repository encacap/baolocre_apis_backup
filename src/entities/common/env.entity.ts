import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EnvironmentEnum } from 'src/interfaces/enums';

export class EnvironmentVariableEntity {
    @IsEnum(EnvironmentEnum)
    NODE_ENV: EnvironmentEnum;

    @IsNumber()
    PORT: number;

    @IsString()
    @IsNotEmpty()
    MONGO_URL: string;

    @IsString()
    JWT_SECRET: string;

    @IsNumber()
    JWT_EXPIRATION_MINUTES: number;

    @IsString()
    CLOUDFLARE_ACCOUNT_ID: string;

    @IsString()
    CLOUDFLARE_IMAGES_API_KEY: string;

    @IsString()
    CLOUDFLARE_IMAGES_API_URL: string;
}
