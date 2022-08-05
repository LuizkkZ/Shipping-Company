import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { VehicleType } from '../entities/vehicle-type.entity';
import { CreateVehicleTypeDto } from './../dto/create-vehicle-type.dto';
import { UpdateVehicleTypeDto } from './../dto/update-vehicle-type.dto';
VehicleType;

@Injectable()
export class VehicleTypeService {
  constructor(
    @InjectRepository(VehicleType)
    private readonly vehicleTypeRepository: Repository<VehicleType>,
  ) {}

  create(createVehicleTypeDto: CreateVehicleTypeDto) {
    return this.vehicleTypeRepository.save(createVehicleTypeDto);
  }

  findAll() {
    return this.vehicleTypeRepository.find();
  }

  async findOne(id: string) {
    try {
      const vehicleT = await this.vehicleTypeRepository.findOneByOrFail({
        id,
      });
      return vehicleT;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Vehicle type not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateVehicleTypeDto: UpdateVehicleTypeDto) {
    const vehicleT = await this.vehicleTypeRepository.findOneByOrFail(
      { id },
    );

    if (!vehicleT) {
      throw new Error('Vehicle type not found');
    }

    vehicleT.totalCapacity = updateVehicleTypeDto.totalCapacity;
    vehicleT.trunkHeigth = updateVehicleTypeDto.trunkHeigth;
    vehicleT.trunkWidth = updateVehicleTypeDto.trunkWidth;
    vehicleT.trunkLength = updateVehicleTypeDto.trunkLength;
    vehicleT.totalVehicleWeight = updateVehicleTypeDto.totalVehicleWeight;
    
    return this.vehicleTypeRepository.save(vehicleT);
  }

  async delete(id: string) {
    try {
      const vehicleT = await this.vehicleTypeRepository.delete({ id });
      return vehicleT;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const newErro = new QueryFailedError('', [], error);
        console.log(newErro.driverError.detail);

        const table = newErro.driverError.table;

        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Vehicle type id ${id} cannot be deleted as it is being used in ${table}`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }
}
