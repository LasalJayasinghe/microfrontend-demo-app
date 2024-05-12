import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreadCrumbDetails } from '../../../../dto/common.dto';

export interface User {
  id:number;
  first_name: string;
  last_name: string;
  email: string;
}

const USER_DATA: User[] = [
  {id:1,first_name: 'danny', last_name: 'johnson',email: 'dannyjohnson@gmail.com',}
];
@Component({
  selector: 'app-created-user',
  templateUrl: './created-user.component.html',
  styleUrls: ['./created-user.component.scss']
})
export class CreatedUserComponent{
  displayedColumns: string[] = ['first_name', 'last_name', 'email','action'];
  dataSource = [...USER_DATA];
  breadcrumbData:BreadCrumbDetails[] = [{url: null ,name:'User Management'}]
  showModal: boolean = false;


  constructor(private router: Router){}

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  addUser() {
    this.router.navigate(['/secure/user-management/create']);
  }

  edit(id: number) {
    this.router.navigate([`/secure/user-management/edit/${id}`]);
  }

  deleteRecord(id: number) {
    console.log(id);
  }


}
