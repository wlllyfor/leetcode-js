import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // throw new HttpException('xxxx', HttpStatus.BAD_REQUEST);
    throw new BadRequestException('xsdf');
    return this.appService.getHello();
  }
}
