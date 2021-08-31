import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd} from '@angular/router';
// import { KeyValue } from '@angular/common';

const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) =>
  obj[key];


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

  
  urlPathTitles: { [key: string]: string } = {
    "transaction-submit": "Transaction Submit",
    "registration": "Registration",
    "confirmation": "Confirmation",
    // "": "",
    // "": "",
    // "": "",
    // "": "",
    // "": "",
    // "": ""
  };

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

  getUrlPathTitle(urlPart: string): string {
    if (this.urlPathTitles.hasOwnProperty(urlPart)) {
      return this.urlPathTitles[urlPart];
    }

    return urlPart;
  }
}
