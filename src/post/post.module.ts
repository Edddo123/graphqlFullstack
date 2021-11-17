import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyerModule } from '../buyer/buyer.module';
import { BuyerPost } from './post.entity';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BuyerPost]),
    forwardRef(() => BuyerModule), // to fix circular dependency
  ],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
