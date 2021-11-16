import { IsNumber, IsString } from 'class-validator';
import { BuyerPost } from '../../graphql';

export class CreateBuyerPostDto extends BuyerPost {
  @IsNumber()
  price: number;

  @IsString()
  propertyType: string;

  @IsString()
  buyerId: string;
}
