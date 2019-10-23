import { IUser } from '../shared/user.service';

export interface IQuestion {
  _id: string;
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
  likedBy: IUser[];
  dislikedBy: IUser[];
}
