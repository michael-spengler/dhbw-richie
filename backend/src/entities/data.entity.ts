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

  @Column({
    default: false
  })
  archived: boolean;

  @Column()
  likedBy: string[];

  @Column()
  dislikedBy: string[];

  @Column()
  source: string;

  @BeforeInsert()
  updateCreationDate() {
    this.creationDate = new Date().getTime();
  }

  @BeforeUpdate()
  updateUpdateDate() {
    this.updateDate = new Date().getTime();
  }

  static transform(question: Data | Data[]) {
    if ((question as Data[]).length) {
      return (question as Data[]).map(q => {
        q['id'] = q._id;
        delete q._id;
        return q;
      });
    } else {
      (question as Data)['id'] = (question as Data)._id;
      delete (question as Data)._id;
      return question as Data;
    }
  }
}
