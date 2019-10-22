import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'richie-header',
  templateUrl: './richie-header.component.html',
  styleUrls: ['./richie-header.component.scss']
})
export class RichieHeaderComponent {
  constructor(public readonly userService: UserService) {}
}
