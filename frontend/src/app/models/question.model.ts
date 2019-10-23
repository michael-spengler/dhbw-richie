import { IUser } from '../shared/user.service';

export interface IQuestion {
  _id: string;
  question: string;
  answer: string;
  lecture: string;
  source: string;
  likes: number;
  dislikes: number;
  comments: any;
  author: IUser;
  state: string;
}
