import { IsNotEmpty, IsString, IsOptional, IsArray, IsUrl, MinLength } from 'class-validator';

export class CreateAudioDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsUrl()
  @IsNotEmpty()
  fileUrl: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
