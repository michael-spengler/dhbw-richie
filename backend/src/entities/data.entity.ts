import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn
} from 'typeorm';
import { Lecture } from './lecture.entity';
import { User } from './user.entity';

@Entity()
export class Data {
  @ObjectIdColumn()
  _id: ObjectID;

  // @IsDefined()
  // @MinLength(1)
  @Column()
  question: string;

  // @IsDefined()
  // @MinLength(1)
  @Column()
  answer: string;

  @Column()
  comment: string;

  @Column(() => Lecture)
  lecture: Lecture;

  @Column({
    default: false
  })
  isReviewed: boolean;

  @Column()
  creationDate: number; // Automatisch

  @Column()
  reviewDate: number;

  @Column()
  updateDate: number; // Automatisch

  @Column(() => User)
  creator: User;

  @Column(() => User)
  modifier: User;

  @Column()
  archived: boolean;

  @Column(() => User)
  likedBy: User[];

  @Column(() => User)
  dislikedBy: User[];

  @BeforeInsert()
  updateCreationDate() {
    this.creationDate = new Date().getTime();
  }

  @BeforeUpdate()
  updateUpdateDate() {
    this.updateDate = new Date().getTime();
  }
}
