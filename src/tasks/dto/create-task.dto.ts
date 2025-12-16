import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  expired_date?: string;

  @IsOptional()
  @IsBoolean()
  is_done?: boolean;
}
