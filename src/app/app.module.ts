import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AngularMaterialModule } from '@WTheme/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { WThemeSharedModule } from '@WTheme/shared.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgxSpinnerModule,
    WThemeSharedModule,
    LayoutModule
  ],
  providers: [
    { provide: 'Window', useValue: window },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
