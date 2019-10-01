export interface Lecture {
  name: string;
  semester: string;
  source: string;
}

export interface User {
  email: string;
  username: string;
  password: string;
  // Rollen
}

export interface Question {
  _id: string; // Kommt so von mongoDb
  question: string;
  answer: string;
  lecture: Lecture;
  review: boolean;
  creationDate: Date; // Automatisch
  reviewDate: Date; // Automatisch
  updatedAt: Date; // Automatisch
  creator: User;
  modifier: User; // lastModifiedBy, ...
  archived: boolean;
}
/**
 * Create,Update Read UI Questions <-- Erst wenn review = true
 * Review Liste
 * Fragen Stellen Ansicht
 * Auth-Screens --> Absprache mit Designteam
 *
 * Git-CrashCourse:
 * git checkout -b feature/<nummer>
 * git checkout -b fix/<nummer>
 *
 * git add .
 * git commit -m "<message>"
 *
 * git push [-u origin <branch-name> nur beim ersten mal]
 *
 * Pull-Request erstellen
 *
 * https://typeorm.io
 */
