import { ValidateButtonComponentModule } from './../../components/validate-button/validate-button.module';
import { BaseModalPage } from './base-modal';
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
    BaseModalPage
  ],
  imports: [
    IonicModule,
    ValidateButtonComponentModule,
    TranslateModule.forChild({ // i18n
        loader: {
            provide: TranslateLoader,
            useFactory: translateFactory,
            deps: [HttpClient]
        }
    })
  ], exports: [
    BaseModalPage
  ]
})
export class BaseModalPageModule {}
