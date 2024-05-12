import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-edit-user.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import {MatCardModule} from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbComponent } from '../../common-components/breadcrumb/breadcrumb.component';

describe('CreateEditUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserComponent,BreadcrumbComponent ],
      imports:[MatCardModule,MatFormFieldModule,ReactiveFormsModule,MatInputModule,BrowserAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            }
          }
        }
      ]
    });
    component = TestBed.createComponent(CreateUserComponent).componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should clear user form', () => {
    component.userForm.setValue({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone_number: '01122222',
      address: 'colombo 01',

    });
    component.clearForm();

    expect(component.userForm.value).toEqual({
      first_name: null,
      last_name: null,
      email: null,
      phone_number: null,
      address: null
    });
  });


  it('should submit the user form', () => {
    component.userForm.setValue({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone_number: '01122222',
      address: 'colombo 01',

    });
    component.saveUser();
    expect(component.userForm.value).toEqual({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone_number: '01122222',
      address: 'colombo 01',
    });
  });
});
