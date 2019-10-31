import { BeforeInsert, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {

  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  userName: string;

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

  @Column()
  likedQuestions: string[];

  @Column()
  dislikedQuestions: string[];

  @Column({
    default: true
  })
  enabled: boolean;

  @BeforeInsert()
  updateCreated() {
    this.created = new Date().getTime();
  }
}
