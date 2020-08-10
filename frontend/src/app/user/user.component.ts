import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class UserComponent implements OnInit {
  user: User;
  allRoles = [
    {name: 'ADMIN', checked: false},
    {name: 'FARMER', checked: false},
    {name: 'CUSTOMER',checked: false}
  ];

  constructor() { }

  ngOnInit() {
  }

}
