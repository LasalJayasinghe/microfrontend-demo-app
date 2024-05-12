import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedUserComponent } from './created-user.component';
import {MatTableModule} from "@angular/material/table";
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BreadcrumbComponent } from '../../common-components/breadcrumb/breadcrumb.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('CreatedUserComponent', () => {
  let component: CreatedUserComponent;
  let fixture: ComponentFixture<CreatedUserComponent>;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedUserComponent, BreadcrumbComponent ],
      imports: [ MatTableModule,RouterTestingModule, MatPaginatorModule, BrowserAnimationsModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to user creation route when addUser is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.addUser();
    expect(navigateSpy).toHaveBeenCalledWith(['/secure/user-management/create']);
  });

  it('should navigate to edit page with the given id', () => {
    const id = 1;
    const navigateSpy = spyOn(router, 'navigate');
    component.edit(id);
    expect(navigateSpy).toHaveBeenCalledWith([`/secure/user-management/edit/${id}`]);
  });

  it('should log the provided ID', () => {
    spyOn(console, 'log');
    const id = 123;
    component.deleteRecord(id);
    expect(console.log).toHaveBeenCalledWith(id);
  });


});
