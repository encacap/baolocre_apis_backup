import { IsOptional, IsString } from 'class-validator';

export class ContactInformationEntity {
  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  zalo: string;

  @IsOptional()
  @IsString()
  facebook: string;

  @IsOptional()
  @IsString()
  youtube: string;

  constructor(partial: Partial<ContactInformationEntity>) {
    Object.assign(this, partial);
  }
}
