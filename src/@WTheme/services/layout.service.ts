import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MediaQueryService } from '@WTheme/services/media-query.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  private _isOpenSidenav: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(true);

  private _isUnfoldedSidenav: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);

  constructor(private _mediaQueryService: MediaQueryService) {
    this._mediaQueryService
      .onIsMediaMobile()
      .pipe(distinctUntilChanged())
      .subscribe((isMediaMobile) => {
        if (isMediaMobile) {
          this._isOpenSidenav.next(false);
          this._isUnfoldedSidenav.next(false);
        }
      });
  }

  public get isUnfoldedSidenav() {
    return this._isUnfoldedSidenav.getValue();
  }

  public set isUnfoldedSidenav(isUnfolded: boolean) {
    this._isUnfoldedSidenav.next(isUnfolded);
  }

  public onIsUnfoldedSidenav(): Observable<boolean> {
    return this._isUnfoldedSidenav.asObservable();
  }

  /**
   * onOpenSidenav
   */
  public onOpenSidenav() {
    return this._isOpenSidenav.asObservable();
  }

  public get isOpenSidenav(): boolean {
    return this._isOpenSidenav.getValue();
  }

  public set isOpenSidenav(isOpen: boolean) {
    this._isOpenSidenav.next(isOpen);
  }

  /**
   * toogleOpenSidenav
   */
  public toogleStateSidenav(): void {
    this._isOpenSidenav.next(!this.isOpenSidenav);
  }

  /**
   * closeSidenav
   */
  public closeSidenav(): void {
    if (!this.isOpenSidenav) {
      return;
    }
    this._isOpenSidenav.next(false);
  }

  /**
   * openSidenav
   */
  public openSidenav(): void {
    if (this.isOpenSidenav) {
      return;
    }

    this._isOpenSidenav.next(true);
  }
}
