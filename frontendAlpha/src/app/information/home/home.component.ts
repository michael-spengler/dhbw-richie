import { Component } from '@angular/core';
import { ConstantsService } from 'src/app/shared/constants.service';
import { FunctionsService } from 'src/app/shared/functions.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    public readonly userService: UserService,
    public readonly constants: ConstantsService,
    public readonly functions: FunctionsService
  ) {}

  selectionChanged(x) {
    console.log('Selected:', x);
  }
}
