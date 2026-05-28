import { ConflictException, Injectable } from '@nestjs/common';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { PrismaService } from 'src/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private readonly db: PrismaService) {}
  async create(createApiDto: CreateApiDto) {
    return await this.db.cars.create({
      data: createApiDto,
      select:{
        id:true,license_plate_number: true, brand:true, model:true, daily_cost: true
      }
    })  

  }

  async findAll() {
    return  await this.db.cars.findMany({
      select:{
        id:true,license_plate_number: true, brand:true, model:true, daily_cost: true
      }
    });
  }
  async rentCar(id: number) {
    const car=await this.db.cars.findUnique({
      where:{id}
    });
    if(!car){
      throw new NotFoundError('Car not found');
    }
    const timeNow=new Date();
    const weekLater=new Date();
    weekLater.setDate(timeNow.getDate()+7);
    const retals=await this.db.rentals.findMany({
      where:{
        car_id:id,
      }
    });
    let isCurrentlyRented = false
    retals.forEach((rental)=>{
      const startDate=new Date(rental.start_date);
      const endDate=new Date(rental.end_date);
      if(startDate<=timeNow && endDate>=timeNow){
        isCurrentlyRented=true;
      }
    })
    if(isCurrentlyRented){
      throw new ConflictException('Következő héten az autó már ki van kölcsönözve');
    }
    return await this.db.rentals.create({
      data:{
        car_id:id,
        start_date:timeNow,
        end_date:weekLater
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} api`;
  }

  update(id: number, updateApiDto: UpdateApiDto) {
    return `This action updates a #${id} api`;
  }

  remove(id: number) {
    return `This action removes a #${id} api`;
  }
}
