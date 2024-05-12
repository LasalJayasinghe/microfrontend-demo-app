import {Injectable} from '@angular/core';
import {STORAGE} from "../../shared/constants/storage.const";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setActiveMenu(subMenu): void {
    localStorage.setItem(STORAGE.SUB_MENU, subMenu);
  }

  getActiveMenu(): string {
    return localStorage.getItem(STORAGE.SUB_MENU) ?? '';
  }

  removeActiveMenu(): void {
    localStorage.removeItem(STORAGE.SUB_MENU);
  }
}
