import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { Gender, Scope } from '../constants/profile.constant';

export class CreateProfileDto {
  @ApiProperty({
    description: 'User Id',
  })
  @IsNumber()
  userId: number;

  @ApiPropertyOptional({
    description: 'First name',
  })
  @IsString()
  first_name: string;

  @ApiPropertyOptional({
    description: 'Last name',
  })
  @IsString()
  last_name: string;

  @ApiPropertyOptional({
    description: 'Nick name',
  })
  @IsString()
  nickname: string;

  @ApiPropertyOptional({
    description: 'Gender',
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiPropertyOptional({
    description: 'Phonenumber',
  })
  @IsString()
  @IsPhoneNumber()
  phone_number: string;

  @ApiPropertyOptional({
    description: 'Address',
    isArray: true,
  })
  @IsString()
  address: string;

  @ApiPropertyOptional({
    description: 'Scope private',
    enum: [Object.values(Scope)],
  })
  @IsEnum(Scope)
  scope: Scope[];

  // @ApiPropertyOptional({
  //   description: 'User Relation',
  // })
}
