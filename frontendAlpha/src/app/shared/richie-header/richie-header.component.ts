import { Component, OnInit } from '@angular/core';
import { IUser, UserService } from '../user.service';

@Component({
  selector: 'richie-header',
  templateUrl: './richie-header.component.html',
  styleUrls: ['./richie-header.component.scss']
})
export class RichieHeaderComponent implements OnInit {
  constructor(public readonly userService: UserService) {}

  public richieUser: IUser;

  ngOnInit(): void {
    this.richieUser = this.userService.richieUser;
  }
}
