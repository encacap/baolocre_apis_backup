import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import envValidation from './core/env.validation';
import { RoleGuard } from './core/role.guard';
import { AuthModule } from './modules/auth/auth.module';
import { ImageModule } from './modules/image/image.module';
import { TokenModule } from './modules/token/token.module';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      validate: envValidation,
      expandVariables: true,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     transport: {
    //       targets: [
    //         {
    //           level: 'info',
    //           target: 'pino-pretty',
    //           options: {
    //             translateTime: true,
    //             singleLine: true,
    //           },
    //         },
    //         {
    //           level: 'trace',
    //           target: 'pino-pretty',
    //           options: {
    //             translateTime: true,
    //             colorize: false,
    //             destination: './logs/http.log',
    //           },
    //         },
    //       ],
    //     },
    //   },
    // }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        pinoHttp: {
          transport: {
            targets: [
              {
                level: 'info',
                target: 'pino-pretty',
                options: {
                  translateTime: true,
                  singleLine: true,
                },
              },
              {
                level: 'trace',
                target: 'pino-pretty',
                options: {
                  translateTime: true,
                  colorize: false,
                  destination: `./logs/${configService.get('NODE_ENV')}.log`,
                },
              },
            ],
          },
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ImageModule,
    TokenModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
