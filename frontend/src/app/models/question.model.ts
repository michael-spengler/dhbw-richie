import { IUser } from '../shared/user.service';

export class Question {
  id: string;
  question: string;
  answer: string;
  lecture: string;
  source: string;
  comment: any;
  isReviewed: boolean;
  creationDate: number;
  reviewDate: number;
  updateDate: number;
  creator: IUser;
  modifier: IUser;
  archived: boolean;
  likedBy: IUser[] = [];
  dislikedBy: IUser[] = [];
  comments: any;
  author: IUser;
  state: string;

  get likes(): number {
    return this.likedBy.length;
  }
  get dislikes(): number {
    return this.dislikedBy.length;
  }

  public reset() {
    this.question = '';
    this.answer = '';
    this.source = '';
    this.lecture = '';
    return this;
  }
}
