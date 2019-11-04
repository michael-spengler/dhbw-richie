import { IsDefined, MinLength } from 'class-validator';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Lecture {
  @ObjectIdColumn()
  _id: ObjectID;

  @IsDefined()
  @MinLength(1)
  @Column()
  name: string;

}
