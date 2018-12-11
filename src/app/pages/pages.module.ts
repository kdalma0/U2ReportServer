import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { HistoryModule } from './history/history.module';
import { ComparegalleryModule } from './comparegallery/comparegallery.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    HistoryModule,
    ComparegalleryModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
