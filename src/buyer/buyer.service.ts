import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buyer } from './buyer.entity';
import { CreateBuyerDto } from './dto/create-buyer.dto';

@Injectable()
export class BuyerService {
  constructor(@InjectRepository(Buyer) private repo: Repository<Buyer>) {}
  async findOneById(id: string) {
    return await this.repo.findOne(id);
  }
  async findAll() {
    return await this.repo.find();
  }

  async addBuyer(buyer: CreateBuyerDto) {
    const newBuyer = await this.repo.create(buyer);
    return await this.repo.save(newBuyer);
  }
}
