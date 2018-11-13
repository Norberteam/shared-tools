import {DomSanitizer} from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {
  constructor(private sanitizer: DomSanitizer) {}

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
}