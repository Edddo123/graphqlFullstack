import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BuyerModule } from './buyer/buyer.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BuyerPost } from './post/post.entity';
import { Buyer } from './buyer/buyer.entity';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    GraphQLModule.forRoot({ 
      playground: true,  
      typePaths: ['./**/*.graphql'], 
      definitions: { 
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    BuyerModule,
    PostModule,
    TypeOrmModule.forRoot(
      {
      type: 'postgres',
      database: 'graphql',
      host: 'localhost',
      username: 'postgres',
      entities: [BuyerPost, Buyer],
      port: 5432, 
      password: process.env.DB_PASSWORD,
      synchronize: true,
    }
    ),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) }],
})
export class AppModule {}
