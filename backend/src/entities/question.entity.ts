import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn
} from 'typeorm';
import { Lecture } from './lecture.entity';

@Entity()
export class Question {
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

  @Column(() => String)
  creator: ObjectID;

  @Column(() => String)
  modifier: ObjectID;

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

  static transform(question: Question | Question[]) {
    if ((question as Question[]).length) {
      return (question as Question[]).map(q => {
        q['id'] = q._id;
        delete q._id;
        return q;
      });
    } else {
      (question as Question)['id'] = (question as Question)._id;
      delete (question as Question)._id;
      return question as Question;
    }
  }
}
