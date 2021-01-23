import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../shared/arcade-state/typings/game';
import { ArcadeStateService } from '../../shared/arcade-state/arcade-state.service';
import { Light } from '../../shared/arcade-state/typings/light';
import { StateCategory } from 'src/shared/arcade-state/typings/state-category';


@Component({
  selector: 'cafe-pause-arcade-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  public readonly Game: typeof Game = Game;
  public readonly Light: typeof Light = Light;

  public constructor(
    public arcadeStateService: ArcadeStateService
  ) {}

  public ngOnInit(): void {
  }
}
