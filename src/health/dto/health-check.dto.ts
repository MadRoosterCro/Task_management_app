import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckDto {
  @ApiProperty({ example: 'The App is up and running!' })
  readonly status: string;
}
