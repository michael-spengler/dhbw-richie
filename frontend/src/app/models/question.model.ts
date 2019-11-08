import { IUser } from '../shared/user.service';

export class Question {
  id: string;
  question: string;
  answer: string;
  lecture: string;
  source: string;
  likedBy: IUser[] = [];
  dislikedBy: IUser[] = [];
  comments: any;
  author: IUser;
  isReviewed: boolean;

  constructor(
    { question, answer, source, lecture }: Partial<Question> = {
      question: '',
      answer: '',
      source: '',
      lecture: ''
    }
  ) {
    this.question = question;
    this.answer = answer;
    this.source = source;
    this.lecture = lecture;
  }

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

  public isValid() {
    return this.answer.length && this.question.length;
  }
}
