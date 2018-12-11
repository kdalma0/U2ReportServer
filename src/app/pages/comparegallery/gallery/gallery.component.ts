import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener,
  Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren,
} from '@angular/core';
import { ImageService } from '../services/image.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'ngx-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: [
    './gallery.component.scss',
  ],
})
export class GalleryComponent implements OnInit, OnDestroy, OnChanges {

  images: Array<any> = [];
  gallery: Array<any> = [];

  imageDataStaticPath: string = '/api/file';
  imageDataCompletePath: string = '';
  dataFileName: string = 'data.json';

  previewImage = 'preview';
  imageMargin: number = 5;
  viewerSubscription: Subscription;

  rightArrowInactive: boolean = false;
  leftArrowInactive: boolean = false;

  @Input('baseUrl') baseUrl: string = '';
  @Input('metadataUri') metadataUri: string = undefined;

  @Output() viewerChange = new EventEmitter<boolean>();

  @ViewChild('galleryContainer') galleryContainer: ElementRef;
  @ViewChildren('imageElement') imageElements: QueryList<any>;

  @HostListener('window:scroll', ['$event']) triggerCycle(event: any): void {
    this.scaleGallery();
  }

  @HostListener('window:resize', ['$event']) windowResize(event: any): void {
    this.render();
  }

  constructor(public imageService: ImageService,
              public http: HttpClient,
              public changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.fetchDataAndRender();
    this.viewerSubscription = this.imageService.showImageViewerChanged$
      .subscribe((visibility: boolean) => this.viewerChange.emit(visibility));
  }

  ngOnChanges(changes: SimpleChanges): void {
    // input params changed
    if (changes['metadataUri'] !== undefined) {
      this.fetchDataAndRender();
    } else {
      this.render();
    }
  }

  ngOnDestroy(): void {
    if (this.viewerSubscription) {
      this.viewerSubscription.unsubscribe();
    }
  }

  openImageViewer(img: any): void {
    this.imageService.updateImages(this.images);
    this.imageService.updateSelectedImageIndex(this.images.indexOf(img));
    this.imageService.showImageViewer(true);
  }

  private fetchDataAndRender(): void {

    this.http.get(this.metadataUri)
      .subscribe(
      (data: Array<any>) => {
          this.images = data;
          this.imageService.updateImages(this.images);

          this.images.forEach(image => {
            image['viewerImageLoaded'] = false;
            image['srcAfterFocus'] = '';
          });
          // twice, single leads to different strange browser behaviour
          this.render();
          this.render();
        },
        err => {
          console.error(err);
        },
        () => undefined);
  }

  private render(): void {
    this.gallery = [];

    if (this.images.length <= 0) {
      return;
    }

    const width = this.images[0][this.previewImage]['width'];
    const rowCount = Math.floor(this.getGalleryWidth() / width);

    this.imageMargin = Math.floor((this.getGalleryWidth() - rowCount * width) / rowCount);

    let tempRow = [];
    for (let index = 0; index < this.images.length; index++) {
      tempRow.push(this.images[index]);
      if (((index + 1) % rowCount) === 0) {
        this.gallery.push(tempRow);
        tempRow = [];
      }
    }
    if (tempRow.length > 0) {
      this.gallery.push(tempRow);
    }

    this.scaleGallery();

    console.log();
  }

  private getGalleryWidth(): number {
    if (this.galleryContainer.nativeElement.clientWidth === 0) {
      // for IE11
      return this.galleryContainer.nativeElement.scrollWidth;
    }
    return this.galleryContainer.nativeElement.clientWidth;
  }

  private scaleGallery(): void {
    let maximumGalleryImageHeight = 0;

    this.gallery.forEach(imgRow => {
          imgRow.forEach((img: any) => {
            img.width = img[this.previewImage]['width'];
            img.height = img[this.previewImage]['height'];
            maximumGalleryImageHeight = Math.max(maximumGalleryImageHeight, img['height']);
            img['srcAfterFocus'] = this.baseUrl + img[this.previewImage]['path'];
          });
      });

    this.changeDetectorRef.detectChanges();
  }

}
