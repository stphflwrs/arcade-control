import { Component, OnInit } from '@angular/core';
import { ArcadeStateService } from '../shared/arcade-state/arcade-state.service';

@Component({
  selector: 'cafe-pause-arcade-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public constructor(
    private arcadeStateService: ArcadeStateService
  ) {}

  public ngOnInit(): void {
    this.arcadeStateService.initialize().subscribe();
  }
}
