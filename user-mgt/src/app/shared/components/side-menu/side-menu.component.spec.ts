import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SideMenuComponent } from './side-menu.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../../../service/secure/auth.service';
import { StorageService } from '../../../service/secure/storage.service';
import { MatMenuModule } from '@angular/material/menu';


describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(waitForAsync(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['getActiveMenu']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['username', 'logout']);

    TestBed.configureTestingModule({
      declarations: [SideMenuComponent],
      providers: [
        MediaMatcher,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatMenuModule], // Add MatMenuModule to imports
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(SideMenuComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with collapsedNav as undefined', () => {
    expect(component.collapsedNav).toBeUndefined();
  });

  it('should call authService.logout on logout', () => {
    component.logout();

    expect(authServiceSpy.logout).toHaveBeenCalled();
  });  

  it('should call subMenuActive on ngOnInit if active menu exists', () => {
    storageServiceSpy.getActiveMenu.and.returnValue('SubMenuName');
    spyOn(component, 'subMenuActive');
  
    component.ngOnInit();
      expect(component.subMenuActive).toHaveBeenCalledWith('SubMenuName');
  });
  
  it('should not call subMenuActive on ngOnInit if active menu is not set', () => {
    storageServiceSpy.getActiveMenu.and.returnValue('');
    spyOn(component, 'subMenuActive'); 
  
    component.ngOnInit();
    expect(component.subMenuActive).not.toHaveBeenCalled();
  });

  it('should update MAIN_MENU with the correct active value', () => {
    const subMenu = 'YourSubMenuName';

    component.subMenuActive(subMenu);
    expect(component.MAIN_MENU.every(menu => !menu.value || menu.name === subMenu)).toBeTrue();
  });

  it('should return false when submenu is not found', () => {
    const subMenu = 'NonExistentSubMenu'; 
    const result = component.getMenuStatus(subMenu);

    expect(result).toBeFalse();
  });

  it('should return the short name', () => {
    const mockFullName = 'John Doe';
    const result = component['getShortName'](mockFullName);
    expect(result).toBe('JD');
  });
});
