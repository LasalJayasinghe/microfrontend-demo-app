import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface BreadCrumbDetails {
  url: string | null;
  name: string;
}
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})

export class BreadcrumbComponent {

  constructor(private router: Router){}

  @Input() data! : BreadCrumbDetails[];

    navigateToPage(url: string) {
      this.router.navigate([url]);
    }
}
