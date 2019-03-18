import {DomSanitizer} from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AppService } from './app.service';
import { MockService } from './mock-service';
import { LoaderService } from './loader-service';
import Rx from "rxjs/Rx";
import b64toBlob from 'b64-to-blob'
import uploadcare from 'uploadcare-widget';

@Injectable()
export class ImageService {
  constructor(
    private sanitizer: DomSanitizer, 
    private camera: Camera,
    private app: AppService,
    private loaderService: LoaderService,
    private mockService: MockService
  ) {}

  /**
   * parse the url format in PROTOCOL + CDNHOST + UID + NAME=OPTIONAL
   * to have an url format like that https://ucarecdn.com/6b216114-8e99-4ec4-a64e-874959fade2e/-/resize/500x/photo37544750007.jpg
   * and no like that https://ucarecdn.com/6b216114-8e99-4ec4-a64e-874959fade2e/photo37544750007.jpg/-/resize/500x/ which brock the cdn url
   * @param url
   */
  parseUrlImg(url) {
    let parsedUrl = {};
    let regex = new RegExp('(https?://)([^:^/]*)(.*/)(.*)$'); //split in PROTOCOL + DOMAIN + UID + FILENAME include .jpg, .png & other format are ckecj by the cdn
    let found = url.match(regex) // return array and [0] = url

    parsedUrl = {
        protocol: found[1],
        host: found[2],
        uid: found[3],
        filename : !(typeof found[4] === 'undefined' ) ? found[4] : ""
    }

    return parsedUrl;
  }

  /**
   * Return safe background image url
   * @param url
   * @param size (number)
   */
  getImageBackground(images: any, size: number) {
    let url;
    let processImg = '-/resize/' + size + 'x/'
    let urlParts;
    if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            let path = images[i];
            if (path && path.length > 0) url = path;
        }
    }
    urlParts = this.parseUrlImg(url);
    url = urlParts.protocol + urlParts.host + urlParts.uid + processImg + urlParts.filename
    return url;
  }

  getSanitizedImageBackground(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

  /**
   * Get image from the camera and just return the image data without uploading.
   * @param direction The direction for the camera (`front` or `back`)
   */
  getImageFromCamera(direction?: string, width?: number, height?: number){
    return this.loaderService.showLoader()
    .switchMap(obs => Rx.Observable.of(this.app.isMobilePlatform()))
    .flatMap(isMobile => {
        this.loaderService.dismissLoader(); // Dismiss loader before opening Camera activity to avoid losing reference

        if(isMobile) {
            const options: CameraOptions = {
                quality: 25,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                correctOrientation: true
              };

              if(direction && direction === 'front') options.cameraDirection = this.camera.Direction.FRONT;
              if(width && width > 0) options.targetWidth = width;
              if(height && height > 0) options.targetHeight = height;


              return Rx.Observable.fromPromise(this.camera.getPicture(options));
        } else {
            // Return mocked image
            return Rx.Observable.of(this.mockService.mockBase64Image());
        }
    })
    .flatMap((imageData: any) => {
        return Rx.Observable.of(imageData); //Just return the image data for further use.
    });
  }

  getImageFromCameraAndUpload() {
      return this.loaderService.showLoader()
      .switchMap(obs => Rx.Observable.of(this.app.isMobilePlatform()))
      .flatMap(isMobile => {
          this.loaderService.dismissLoader(); // Dismiss loader before opening Camera activity to avoid losing reference

          if(isMobile) {
              const options: CameraOptions = {
                  quality: 25,
                  destinationType: this.camera.DestinationType.DATA_URL,
                  encodingType: this.camera.EncodingType.JPEG,
                  mediaType: this.camera.MediaType.PICTURE,
                  correctOrientation: true
                };

                return Rx.Observable.fromPromise(this.camera.getPicture(options));
          } else {
              // Return mocked image
              return Rx.Observable.of(this.mockService.mockBase64Image());
          }
      })
      .flatMap((imageData: any) => {
          return this.loaderService.showLoader() // Show loader again
              .switchMap(obs => this.updloadToCdn(imageData));
      })
      .flatMap((cdnResponse: any) => {
          return Rx.Observable.of(cdnResponse.cdnUrl);
      });
  }

  updloadToCdn(imageData: any) {
      return Rx.Observable.create(observer => { // Extract picture
          let base64Image = imageData;
          var contentType = 'image/jpeg';
          var blob = b64toBlob(base64Image, contentType);
          var file = uploadcare.fileFrom('object', blob);
          file.done(function(info) {
              observer.next(info);
              observer.complete();
          });
      });
  }

  /**
   * Convert the image data from base64 encoded string
   * @param imageData 
   */
  convertImage(imageData: any){
      return `data:image/jpeg;base64,${imageData}`;
  }  
}