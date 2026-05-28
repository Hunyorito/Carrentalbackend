import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post()
  create(@Body() createApiDto: CreateApiDto) {
    return this.apiService.create(createApiDto);
  }

  @Get()
  findAll() {
    return this.apiService.findAll();
  }

  @Post(':id/rent')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.apiService.rentCar(id);
  }

  
}
