import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyerPost } from './post.entity';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([BuyerPost])],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
