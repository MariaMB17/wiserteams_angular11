import { Injectable, Inject } from '@angular/core';
import { AppSize } from '@WTheme/types/interfaces/app-size.interface';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MediaQueryService {
  private _appSizeWindow$: BehaviorSubject<AppSize> = new BehaviorSubject(null);
  private _mediaChange$: BehaviorSubject<string> = new BehaviorSubject('');
  private _isMobile$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    @Inject('Window') private _window: Window,
    private _mediaObserver: MediaObserver
  ) {
    this._appSizeWindow$.next({
      width: _window.innerWidth,
      height: _window.innerHeight,
    });
  }

  public init(): void {
    this._setPropertyDocumentVH();

    this._mediaObserver.media$
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((change: MediaChange) => {
        // console.log(change);
        if (this._mediaChange$.getValue() !== change.mqAlias) {
          this._mediaChange$.next(change.mqAlias);
          this._isMobile$.next(this._validateIsMobile(change.mqAlias));
        }
      });

    /* inicializa el escuchador del evento 'rezize' de 'Window' */
    fromEvent(this._window, 'resize').subscribe((evt: Event) => {
      const { innerWidth, innerHeight } = evt.target as any;

      this._appSizeWindow$.next({
        height: innerHeight,
        width: innerWidth,
      });

      this._setPropertyDocumentVH();
    });

    fromEvent(this._window, 'orientationchange').subscribe((evt: Event) => {
      const { innerWidth, innerHeight } = evt.target as any;

      this._appSizeWindow$.next({
        height: innerHeight,
        width: innerWidth,
      });
      // console.log('rotate')
      this._setPropertyDocumentVH();
    });
  }

  public get windowSizes(): AppSize {
    return this._appSizeWindow$.getValue();
  }

  public onWindowSize(): Observable<AppSize> {
    return this._appSizeWindow$.asObservable().pipe(debounceTime(100));
  }

  public get mediaChange(): string {
    return this._mediaChange$.getValue();
  }

  public onMediaChange(): Observable<string> {
    return this._mediaChange$.asObservable();
  }

  public get isMediaMobile(): boolean {
    return this._isMobile$.getValue();
  }

  /**
   * onMediaMobile
   */
  public onIsMediaMobile(): Observable<boolean> {
    return this._isMobile$.asObservable();
  }

  private _validateIsMobile(media: string) {
    return media === 'sm' || media === 'xs' || media === 'md';
  }

  private _setPropertyDocumentVH() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = this._window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    this._window.document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}
