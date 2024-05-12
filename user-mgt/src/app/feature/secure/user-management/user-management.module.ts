import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { CreateUserComponent } from './create-edit-user/create-edit-user.component';
import { CreatedUserComponent } from './created-user/created-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {NgxSpinnerModule} from "ngx-spinner";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonComponentsModule } from '../common-components/common-components.module';


@NgModule({
  declarations: [
    CreateUserComponent,
    CreatedUserComponent,
    UserProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    NgxSpinnerModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonComponentsModule
  ]
})
export class UserManagementModule { }
