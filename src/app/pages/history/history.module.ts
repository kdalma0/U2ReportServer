import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { HistoryComponent } from './history.component';
import { GraphComponent, ReversePipe } from './graph/graph.component';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    HistoryComponent,
    GraphComponent,
    ReversePipe,
  ],
})
export class HistoryModule { }
