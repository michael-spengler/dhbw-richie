import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from './config';
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';
import { Lecture } from './entities/lecture.entity';
import { Question } from './entities/question.entity';
import { TelegrammGroups } from './entities/telegrammGroups.entity';
import { User } from './entities/user.entity';
import { LectureModule } from './lecture/lecture.module';
import { LoginModule } from './login/login.module';
import { PassportModule } from './passport';
import { QuestionModule } from './question/question.module';
import { RolesModule } from './roles/roles.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PassportModule,
    LoginModule,
    RolesModule,
    ConfigModule,
    QuestionModule,
    LectureModule,
    ElasticsearchModule,
    UserModule,
    SchedulingModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        ({
          type: 'mongodb',
          url: configService.get('MONGO_URL'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
          synchronize: true,
          entities: [Question, User, Lecture, TelegrammGroups]
        } as TypeOrmModuleOptions),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([Question])
  ]
})
export class AppModule {}
