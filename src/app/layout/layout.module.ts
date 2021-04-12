import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WThemeSharedModule } from '@WTheme/shared.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';



@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    WThemeSharedModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class LayoutModule { }
