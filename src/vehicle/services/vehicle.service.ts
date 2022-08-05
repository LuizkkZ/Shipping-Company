import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { DriverService } from '../../driver/services/driver.service';
import { VehicleTypeService } from '../../vehicle-type/services/vehicle-type.service';
import { CreateVehicleDto } from './../dto/create-vehicle.dto';
import { UpdateVehicleDto } from './../dto/update-vehicle.dto';
Vehicle;

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private readonly driverService: DriverService,
    private readonly vehicleTypeService: VehicleTypeService,
  ) {}

  create(createVehicleDto: CreateVehicleDto) {

    const vehicleTypeExists = this.vehicleTypeService.findOne(
      createVehicleDto.idVehicleType,
    );

    if (!vehicleTypeExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Vehicle type id ${createVehicleDto.idVehicleType} does not exist`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.vehicleRepository.save(createVehicleDto);
  }

  findAll() {
    return this.vehicleRepository.find();
  }

  async findOne(id: string) {
    try {
      const vehicle = await this.vehicleRepository.findOneByOrFail({
        id,
      });
      return vehicle;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Vehicle not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.vehicleRepository.findOneByOrFail({ id });
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    vehicle.idDriver = updateVehicleDto.idDriver;
    vehicle.idVehicleType = updateVehicleDto.idVehicleType;
    vehicle.licensePlate = updateVehicleDto.licensePlate;

    return this.vehicleRepository.save(vehicle);
  }

  async delete(id: string) {
    try {
      const vehicle = await this.vehicleRepository.delete({ id });
      return vehicle;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const newErro = new QueryFailedError('', [], error);
        console.log(newErro.driverError.detail);

        const table = newErro.driverError.table;

        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Vehicle id ${id} cannot be deleted as it is being used in ${table}`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }
}
