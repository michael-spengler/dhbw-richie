import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";
import { Lecture } from "./lecture.entity";
import { User } from "./user.entity";

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

    @Column(type => Lecture)
    lecture: Lecture;

    @Column()
    isReviewed: boolean;

    @Column()
    creationDate: Date; // Automatisch

    @Column()
    reviewDate: Date; // Automatisch

    @Column()
    updateDate: Date; // Automatisch

    @Column(type => User)
    creator: User; // Username

    @Column(type => User)
    modifier: User; // lastModifiedBy, ...

    @Column()
    archived: boolean;
}