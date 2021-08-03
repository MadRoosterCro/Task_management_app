import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { HealthCheckDto } from './dto/health-check.dto';

@ApiTags('Health check')
@Controller()
export class HealthController {
  @Get('health-check')
  @ApiOperation({ summary: 'Check if the app is up and running' })
  @ApiOkResponse({
    type: HealthCheckDto,
  })
  status(): HealthCheckDto {
    return {
      status: 'OK!',
    };
  }
}
