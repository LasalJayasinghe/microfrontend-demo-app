import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import {MatCardModule} from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from "@angular/material/icon";
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbComponent } from '../../common-components/breadcrumb/breadcrumb.component';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordComponent, BreadcrumbComponent],
      imports:[MatCardModule,MatFormFieldModule,MatIconModule,ReactiveFormsModule,MatInputModule,BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the password', () => {
    component.userForm.setValue({
      email: 'john@example.com',
      new_password: 'johnexample@123',
      re_type_new_password: 'johnexample@123'
    });
    component.updatePassword();
    expect(component.userForm.value).toEqual({
      email: 'john@example.com',
      new_password: 'johnexample@123',
      re_type_new_password: 'johnexample@123'
    });
  });
});
