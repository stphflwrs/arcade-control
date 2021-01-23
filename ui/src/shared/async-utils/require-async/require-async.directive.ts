import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RequireAsyncContext } from './require-async-context';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[requireAsync]',
  exportAs: 'asyncWrapper',
})
export class RequireAsyncDirective<T = any> implements OnDestroy, OnInit {
  private readonly context: RequireAsyncContext<T>;
  private readonly onUnsubscribe: Subject<void>;
  private ready: boolean;

  // tslint:disable-next-line:no-input-rename
  @Input('requireAsync')
  public readonly asyncData: Observable<T>;

  public constructor(
    private templateRef: TemplateRef<RequireAsyncContext<T>>,
    private viewContainerRef: ViewContainerRef,
  ) {
    this.context = {
      $implicit: undefined,
    };
    this.onUnsubscribe = new Subject<void>();
    this.ready = false;
  }

  public ngOnDestroy(): void {
    this.onUnsubscribe.next();
    this.onUnsubscribe.complete();
  }

  public ngOnInit(): void {
    this.asyncData.pipe(
      takeUntil(this.onUnsubscribe),
    ).subscribe((data: T) => {
      this.context.$implicit = data;
      if (!this.ready) {
        this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
        this.ready = true;
      }
    });
  }
}
