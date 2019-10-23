import { Component } from '@angular/core';
import { constants } from 'src/app/shared/constants';
import { SharedFunctions } from 'src/app/shared/sharedFunctions.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    public readonly userService: UserService,
    public readonly functions: SharedFunctions
  ) {
    this.constants = constants;
  }
  public readonly constants: any;
}
