import { NgModule } from '@angular/core';
import { RequireAsyncDirective } from './require-async/require-async.directive';


@NgModule({
  declarations: [
    RequireAsyncDirective
  ],
  exports: [
    RequireAsyncDirective
  ]
})
export class AsyncUtilsModule {}
