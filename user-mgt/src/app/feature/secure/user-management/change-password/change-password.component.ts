import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreadCrumbDetails } from '../../../../dto/common.dto';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent{
  userForm!: FormGroup;
  showOldPassword: boolean = false;
  breadcrumbData:BreadCrumbDetails[] = [{url: null ,name:'Change Password'}]

  ngOnInit(): void {
    this.initializedTheForm();
  }

  initializedTheForm() {
    this.userForm = new FormGroup ({
      email: new FormControl('',Validators.required),
      new_password: new FormControl('',Validators.required),
      re_type_new_password: new FormControl('',Validators.required),
    })
  }

  updatePassword() {
    console.log(this.userForm);
  }

}
