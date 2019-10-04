import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Data } from './entities/data.entity';
import { Lecture } from './entities/lecture.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: async () =>
        ({
          type: 'mongodb',
          url:
            'mongodb+srv://dhbwrichie:ichbineinbot@dhbw-richie-xmcim.mongodb.net/dhbw-richie?retryWrites=true&w=majority',
          useNewUrlParser: true,
          useUnifiedTopology: true,
          synchronize: true,
          entities: [Data, User, Lecture],
        } as TypeOrmModuleOptions),
    }),
    TypeOrmModule.forFeature([Data]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
