import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: 'ngx-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {

  navigationSubscription;
  groupName: string = '';
  testName: string = '';
  passGate: number;
  dataArray: Array<any>;

  constructor(private themeService: NbThemeService,
              private route: ActivatedRoute,
              private router: Router) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.refreshInit();
      }
    });
  }

  refreshInit() {
    this.groupName = this.route.snapshot.paramMap.get('group');
    this.testName = this.route.snapshot.paramMap.get('testcase');
  }

  ngOnInit() {
    this.themeService.getJsTheme();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
