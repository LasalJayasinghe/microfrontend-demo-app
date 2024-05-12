import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {StorageService} from "../../../service/secure/storage.service";
import {MAIN_MENU} from "../../constants/menu.const";
import {AuthService} from "../../../service/secure/auth.service";
import {map, Observable} from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {
  collapsedNav: boolean | undefined;
  mobileQuery: MediaQueryList;
  public MAIN_MENU = MAIN_MENU;
  public userName: string = 'Test User';
  private readonly _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher,
              private authService: AuthService,
              private storageService: StorageService,
              private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    if (this.storageService.getActiveMenu()) {
      this.subMenuActive(this.storageService.getActiveMenu());
    }
  }

  subMenuActive(subMenu) {
    MAIN_MENU.forEach((menu, key) => {
      if (menu.name === subMenu) {
        MAIN_MENU[key].value = true;
        this.storageService.setActiveMenu(subMenu);
      } else {
        MAIN_MENU[key].value = false;
      }
    })
  }

  getMenuStatus(subMenu) {
    const menu = MAIN_MENU.find(menu => subMenu === menu.name);
    if (menu) {
      return menu.value;
    } else {
      return false;
    }
  }

  profile() {
    this.router.navigate(['/secure/profile']);
  }

  logout() {
    this.authService.logout();
  }

  getUsername(): Observable<string> {
    return this.authService.username;
  }

  getShortUsername(): Observable<string> {
    return this.authService.username.pipe(
      map((username: string) => {
        return this.getShortName(username);
      })
    );
  }

  private getShortName(fullName) {
    const userArr = fullName.split(' ');
    return userArr.slice(0, 2).map(n => n[ 0 ]).join('');
  }
}
