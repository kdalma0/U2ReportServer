import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ngx-comparegallery',
  templateUrl: './comparegallery.component.html',
  styleUrls: ['./comparegallery.component.scss'],
})
export class ComparegalleryComponent implements OnInit {

  baseUrl: string = '';
  apiUrl: string = '';
  groupName: string = '';
  testName: string = '';
  seqNumber: string = '';

  constructor(private themeService: NbThemeService,
              private route: ActivatedRoute) {
    this.themeService.getJsTheme();
  }

  ngOnInit() {
    this.baseUrl = environment.apiBase;
    this.apiUrl = environment.apiBase + '/api/file';
    this.groupName = this.route.snapshot.paramMap.get('group');
    this.testName = this.route.snapshot.paramMap.get('testcase');
    this.seqNumber = this.route.snapshot.paramMap.get('seq');
  }
}
