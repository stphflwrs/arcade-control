import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HasBrightness } from '../../../shared/arcade-state/typings/has-brightness';
import { faSun, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { StatePanelControl } from '../state-panel-control';


@Component({
  selector: 'cafe-pause-arcade-brightness-control',
  templateUrl: './brightness-control.component.html',
  styleUrls: ['../control.scss', './brightness-control.component.scss']
})
export class BrightnessControlComponent implements StatePanelControl<HasBrightness> {
  @Input()
  public state: HasBrightness;

  @Output()
  public changeState: EventEmitter<HasBrightness>;

  public readonly faSun: IconDefinition = faSun;
  public readonly faTimes: IconDefinition = faTimes;

  public get sliderMarkerStyle(): object {
    return {
      // left: `${this.state.brightness}%`,
      left: `calc((100% - 8px) * ${this.state.brightness / 100})`
    };
  }

  public showSlider: boolean;

  public constructor() {
    this.changeState = new EventEmitter<HasBrightness>();
    this.showSlider = false;
  }

  public onClickSliderBg(event: MouseEvent): void {
    const newBrightness: number = Math.round(event.offsetX / (event.target as HTMLElement).offsetWidth * 100);
    this.state.brightness = newBrightness;
    console.log(event);
  }

  public onDragSliderMarker(event: DragEvent): void {
    console.log(event);
  }

  public toggleSlider(): void {
    this.showSlider = !this.showSlider;
  }
}
