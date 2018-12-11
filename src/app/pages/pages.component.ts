import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbMenuItem } from '@nebular/theme';
import { MENU_ITEMS } from './pages-menu';

import { environment } from '../../environments/environment';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})

export class PagesComponent {

  public menu: NbMenuItem[] = [];

  private menuItems: NbMenuItem[];

  constructor(private http: HttpClient) {
    this.getMenus();
    this.menu = this.menuItems;
  }

  private getMenus(): void {
    this.menuItems = MENU_ITEMS;
    const offset: number = this.menuItems.length;
    this.http
      .get<Array<string>>(environment.apiBase + '/api/file/all')
      .subscribe(groups => this.getTestcases(offset, groups));
  }

  private getTestcases(offset: number, groups: Array<string>): void {
    for (let index1: number = 0; index1 < groups.length; index1++) {
      this.menuItems.push({
        title: groups[index1], icon: 'nb-grid-a-outline', children: [],
      });
      this.http
        .get<Array<string>>(environment.apiBase + '/api/file/' + groups[index1] + '/all')
        .subscribe(testcases => {
          for (let index2: number = 0; index2 < testcases.length; index2++) {
            this.menuItems[offset + index1].children.push({
              title: testcases[index2],
              icon: 'nb-bar-chart',
              link: '/pages/history/' + groups[index1] + '/' + testcases[index2],
            });
          }
        });
    }
  }
}
