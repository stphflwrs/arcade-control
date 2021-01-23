import { NgModule } from '@angular/core';
import { ResourceModule } from './resource/resource.module';
import { ArcadeStateModule } from './arcade-state/arcade-state.module';
import { AsyncUtilsModule } from './async-utils/async-utils.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    ArcadeStateModule,
    AsyncUtilsModule,
    CommonModule,
    FontAwesomeModule,
    ResourceModule
  ],
  exports: [
    ArcadeStateModule,
    AsyncUtilsModule,
    CommonModule,
    FontAwesomeModule,
    ResourceModule
  ]
})
export class SharedModule {}
