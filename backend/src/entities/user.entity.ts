import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    email: string;
    
    @Column()
    username: string;
    
    @Column()
    password: string;
    
    @Column()
    isAdmin: boolean; // Rechte: isReviewer + Reviewer bestimmen, Löschen (Archivieren), evtl. Benachrichtigungen/Berichte per Mail/Inbox...
    
    @Column()
    isReviewer: boolean; // Rechte: Neue Fragen (Data) eintragen, Data reviewen & bestätigen/ablehnen (endgültig eintragen)
}