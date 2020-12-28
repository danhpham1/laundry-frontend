import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import * as group from './ngrx/reducers/group.reducer';
import { IAppState } from './ngrx/models/base.model';
import { GroupEffects } from './ngrx/effects/group.effect';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';

import { AppComponent } from './app.component';
import { MainModule } from './@main/main.module';
import { AppRoutingModule } from './app-routing.module';




export const Reducers: ActionReducerMap<IAppState, any> = {
  group: group.groupReducer
}

const EFFECTS_LIST: Array<any> = [GroupEffects];

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MainModule,
    StoreModule.forRoot(Reducers),
    EffectsModule.forRoot([GroupEffects])
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
