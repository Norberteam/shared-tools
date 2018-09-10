import { BaseModalPageBack } from './base-modal-back';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function translateFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    BaseModalPageBack
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild({ // i18n
        loader: {
            provide: TranslateLoader,
            useFactory: translateFactory,
            deps: [HttpClient]
        }
    })
  ], exports: [
    BaseModalPageBack
  ]
})
export class BaseModalBackPageModule {}
