import { Resolver, Query, Args, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { PostService } from 'src/post/post.service';
import { Buyer } from './buyer.entity';
import { BuyerService } from './buyer.service';
import { CreateBuyerDto } from './dto/create-buyer.dto';

@Resolver('Buyer')
export class BuyerResolver {
  constructor(
    private buyerService: BuyerService,
    private postService: PostService,
  ) {}

  @Query('buyer')
  async getBuyer(@Args('id') id: string) {
    return await this.buyerService.findOneById(id);
  }

  @Query('buyers')
  async getBuyers() { 
    return await this.buyerService.findAll();
  } 
  
  @ResolveField('posts')
  async getPosts(@Parent() buyer: Buyer) { 
    return await this.postService.findAll(buyer);
  }
    
  @Mutation()
  async addBuyer(@Args() buyer: CreateBuyerDto) {  
    return this.buyerService.addBuyer(buyer)
  }

 
}

//  buyers(): Buyer[]
