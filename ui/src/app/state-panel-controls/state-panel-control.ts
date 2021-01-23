import { EventEmitter } from '@angular/core';


export interface StatePanelControl<T> {
  state: T;
  changeState: EventEmitter<T>;
}
