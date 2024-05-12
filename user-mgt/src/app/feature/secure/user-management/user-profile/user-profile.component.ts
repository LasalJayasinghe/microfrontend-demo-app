import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreadCrumbDetails } from '../../../../dto/common.dto';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent{

  breadcrumbData:BreadCrumbDetails[] = [{url: null ,name:'Profile'}]
  constructor(private router: Router) {}

  changePassword() {
    this.router.navigate(['/secure/change-password']);
  }
}
