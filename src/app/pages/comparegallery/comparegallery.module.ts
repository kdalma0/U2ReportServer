import { NgModule } from '@angular/core';
import { ComparegalleryComponent } from './comparegallery.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageService } from './services/image.service';
import { ViewerComponent } from './viewer/viewer.component';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    ComparegalleryComponent,
    ViewerComponent,
    GalleryComponent,
  ],
  providers: [
    ImageService,
  ],
})
export class ComparegalleryModule {
}
