import { Environment } from 'src/interfaces/enums';
export declare class EnvironmentVariableEntity {
    NODE_ENV: Environment;
    PORT: number;
    MONGO_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRATION_MINUTES: number;
    CLOUDFLARE_ACCOUNT_ID: string;
    CLOUDFLARE_IMAGES_API_KEY: string;
    CLOUDFLARE_IMAGES_API_URL: string;
}
