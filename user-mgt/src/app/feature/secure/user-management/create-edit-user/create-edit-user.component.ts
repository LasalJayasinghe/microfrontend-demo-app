import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BreadCrumbDetails } from '../../../../dto/common.dto';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateUserComponent implements OnInit{
  userForm!: FormGroup;
  userId:string | null = null;
  breadcrumbData:BreadCrumbDetails[] = []

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.initializedTheForm();
    this.userId = this.route.snapshot.paramMap.get('id');
    this.breadcrumbData = [{url:'/secure/user-management',name:'User Management'},{url:null,name: this.userId ? 'Edit' :'Create'}]
  }

  initializedTheForm() {
    this.userForm = new FormGroup ({
      first_name: new FormControl('',Validators.required),
      last_name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      phone_number: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required)
    })
  }

  clearForm() {
    this.userForm.reset();
  }

  saveUser() {
    console.log(this.userForm); //do the necessary things
  }
}
