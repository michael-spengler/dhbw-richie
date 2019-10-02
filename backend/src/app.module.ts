import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { User } from './entities/user.entity';
import { Data } from './entities/data.entity';
import { Connection, UpdateDateColumn } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports:[],
    useFactory: async () => ({
      type: "mongodb",
      url: "mongodb+srv://dhbwrichie:ichbineinbot@dhbw-richie-xmcim.mongodb.net/dhbw-richie?retryWrites=true&w=majority",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //port: 27017,
      //database: "dhbw-richie",
      //password: "ichbineinbot",
      synchronize: true,
      entities: [Data, User, Lecture]
    } as TypeOrmModuleOptions)
  })],
  controllers: [AppController],
  providers: [AppService],
})
  
export class AppModule {
  /**
   * 
   */
}
  
