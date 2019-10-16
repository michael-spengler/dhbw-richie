import { BeforeInsert, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

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

  @BeforeInsert()
  updateCreated() {
    this.created = new Date().getTime();
  }
}
