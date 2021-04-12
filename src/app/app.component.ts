import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '@WTheme/services/layout.service';
import { MediaQueryService } from '@WTheme/services/media-query.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isOpenSidenavMobile$: Observable<boolean>;
  public isUnfoldedSidenav$: Observable<boolean>;
  title = 'wiserteams';

  constructor(
    private _layoutService: LayoutService,
    private _mediaQueryService: MediaQueryService
  ) {    
    this.isOpenSidenavMobile$ = this._layoutService.onOpenSidenav();
    this.isUnfoldedSidenav$ = this._layoutService.onIsUnfoldedSidenav();
  }
}
