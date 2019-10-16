import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn
} from 'typeorm';
import { Lecture } from './lecture.entity';
import { User } from './user.entity';

@Entity()
export class Data {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  question: string;

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

  @CreateDateColumn()
  creationDate: Date; // Automatisch

  @Column({
    type: 'date',
    default: Date.now()
  })
  reviewDate: Date; // Automatisch

  @UpdateDateColumn()
  updateDate: Date; // Automatisch

  @Column(() => User)
  creator: User; // Username

  @Column(() => User)
  modifier: User; // lastModifiedBy, ...

  @Column()
  archived: boolean;
}
