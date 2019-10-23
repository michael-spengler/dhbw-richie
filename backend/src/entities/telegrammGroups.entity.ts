import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class TelegrammGroups {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column()
    userCount: number;

    @Column()
    description: string;

    @Column()
    url: string;

    @Column()
    picture: string;
}