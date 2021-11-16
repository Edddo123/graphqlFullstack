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
    return await this.postService.findAll;
  }

  @Mutation()
  async addBuyerPost(@Args() post: CreateBuyerPostDto) {
    console.log('here', post);
    return await this.postService.create(post);
  }
}

//  buyers(): Buyer[]
