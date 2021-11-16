import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Buyer } from 'src/buyer/buyer.entity';
import { Repository } from 'typeorm';
import { CreateBuyerPostDto } from './dto/create-buyer-post.dto';
import { BuyerPost } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(BuyerPost) private repo: Repository<BuyerPost>,
  ) {}
  async findAll(buyer: Buyer) {
    return await this.repo.find({ buyer });
  }

  async findOneById(id: string) {
    return await this.repo.findOne(id);
  }

  async create(post: CreateBuyerPostDto) {
    const buyerPost = this.repo.create(post);
    return await this.repo.save(buyerPost);
  }
}
