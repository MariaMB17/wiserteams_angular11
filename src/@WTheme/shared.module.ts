import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from './material.module';

@NgModule({
  declarations: [],
  exports: [AngularMaterialModule, FlexLayoutModule],
})
export class WThemeSharedModule {}