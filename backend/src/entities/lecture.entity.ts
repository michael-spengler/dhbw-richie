import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";

@Entity()
export class Lecture {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column()
    source: string
    
}