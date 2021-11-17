import { IsNumber, IsString } from 'class-validator';
import { Buyer } from 'src/buyer/buyer.entity';
import { BuyerPost } from '../../graphql';

export class CreateBuyerPostDto extends BuyerPost {
  @IsNumber()
  price: number;

  @IsString()
  propertyType: string;

  @IsString()
  buyer: Buyer;
}
