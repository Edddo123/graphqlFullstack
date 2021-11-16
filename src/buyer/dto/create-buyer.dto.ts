import { IsString } from 'class-validator';
import { isString } from 'util';
import { Buyer } from '../../graphql';

export class CreateBuyerDto extends Buyer {
  @IsString()
  email: string;

  @IsString()
  location: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
