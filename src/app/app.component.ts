import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd} from '@angular/router';

interface Nav {
  link: string,
  name: string,
  exact: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'phone-validator-fe-ng-scss Rendering flow';
  currentUrlArr: Array<string>;

  nav: Nav[] = [
    {
        "link": '/',
        "name": 'Home',
        "exact": true
    },
    {
        "link": '/transactions',
        "name": 'Transactions',
        "exact": true
    },
    {
        "link": '/transaction-submit',
        "name": 'Transaction Submit',
        "exact": true
    },
    {
        "link": '/oops',
        "name": '404',
        "exact": false
    },
  ];

  constructor(
    private router: Router,
  ) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentUrlArr = e.url.trim().split('/') || [];
      }
    });
  }
}
