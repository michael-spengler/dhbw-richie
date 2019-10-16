import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { PassportModule } from './passport';
import { RolesModule } from './roles/roles.module';
import { Data } from './entities/data.entity';
import { Lecture } from './entities/lecture.entity';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from './config';
import { TelegrammGroups } from './entities/telegrammGroups.entity';

@Module({
  imports: [
    PassportModule,
    LoginModule,
    RolesModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        ({
          type: 'mongodb',
          url: configService.get('MONGO_URL'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
          synchronize: true,
          entities: [Data, User, Lecture, TelegrammGroups],
        } as TypeOrmModuleOptions),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([Data]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
