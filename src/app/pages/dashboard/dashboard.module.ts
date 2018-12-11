import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';

import { DashboardComponent } from './dashboard.component';
import { PassRateComponent } from './passrate/passrate.component';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    PassRateComponent,
  ],
})
export class DashboardModule { }
