import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  BeforeInsert
} from 'typeorm';
import { Data } from './data.entity';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  email: string;

  @Column()
  isAdmin: boolean;

  @Column()
  isReviewer: boolean;

  @Column()
  familyName: string;

  @Column()
  givenName: string;

  @Column()
  picture: string;

  @Column()
  googleId: number;

  @Column()
  created: number;

  @Column(() => Data)
  likedQuestions: Data[];

  @Column(() => Data)
  dislikedQuestions: Data[];

  @BeforeInsert()
  updateCreated() {
    this.created = new Date().getTime();
  }

}
