import { IsNotEmpty } from 'class-validator';

export class RefreshTokenRequestEntity {
  @IsNotEmpty()
  refreshToken: string;
}
