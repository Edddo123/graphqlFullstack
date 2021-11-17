import { forwardRef, Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { BuyerService } from '../buyer/buyer.service';
import { CreateBuyerPostDto } from './dto/create-buyer-post.dto';
import { BuyerPost } from './post.entity';
import { PostService } from './post.service';

@Resolver('BuyerPost')
export class PostResolver {
  constructor(
    private buyerService: BuyerService,
    private postService: PostService,
  ) {}
  @Query('post')
  async getPost(@Args('id') id: string) {
    return await this.postService.findOneById(id);
  }

  @Query('posts')
  async getPosts() {
    return await this.postService.find();
  }

  @ResolveField('buyer')
  async getBuyer(@Parent() post: BuyerPost) {
    return await this.buyerService.findOneById(post.buyer.id);
  }

  @Mutation()
  async addBuyerPost(@Args() post: CreateBuyerPostDto) {
    return await this.postService.create(post);
  }
}

//  buyers(): Buyer[]
