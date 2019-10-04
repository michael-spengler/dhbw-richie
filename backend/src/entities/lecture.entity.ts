import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Lecture {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  source: string;
}
