import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });

    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get active menu', () => {
    const subMenu = 'SubMenu1';
    service.setActiveMenu(subMenu);

    const retrievedSubMenu = service.getActiveMenu();

    expect(retrievedSubMenu).toBe(subMenu);
  });

  it('should remove active menu', () => {
    const subMenu = 'SubMenu1';
    service.setActiveMenu(subMenu);

    service.removeActiveMenu();

    const retrievedSubMenu = service.getActiveMenu();

    expect(retrievedSubMenu).toBe('');
  });
});
