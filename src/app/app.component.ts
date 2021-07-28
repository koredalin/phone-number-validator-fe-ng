import { Component } from '@angular/core';

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
        "link": '/oops',
        "name": '404',
        "exact": false
    },
  ];

  constructor() {}
}
