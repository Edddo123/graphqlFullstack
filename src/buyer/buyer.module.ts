import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buyer } from './buyer.entity';
import { PostModule } from 'src/post/post.module';
import { BuyerService } from './buyer.service';
import { BuyerResolver } from './buyer.resolver';

@Module({
  providers: [BuyerService, BuyerResolver],
  imports: [forwardRef(() => PostModule) , TypeOrmModule.forFeature([Buyer])],
  exports: [BuyerService]
})
export class BuyerModule {}
