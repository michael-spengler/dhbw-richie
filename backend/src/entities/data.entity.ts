import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
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

    @CreateDateColumn()
    creationDate: Date; // Automatisch

    @CreateDateColumn()
    reviewDate: Date; // Automatisch

    @UpdateDateColumn()
    updateDate: Date; // Automatisch

    @Column(type => User)
    creator: User; // Username

    @Column(type => User)
    modifier: User; // lastModifiedBy, ...

    @Column()
    archived: boolean;
}