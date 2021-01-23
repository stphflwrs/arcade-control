import { Injectable } from '@angular/core';
import { StateResource } from '../resource/state/state.resource';
import { BehaviorSubject, defer, iif, interval, NEVER, Observable, Subject } from 'rxjs';
import { ArcadeState } from './typings/arcade-state';
import { concatMap, finalize, skipWhile, switchMap, tap } from 'rxjs/operators';
import { StateMapperService } from './parser/state-mapper.service';
import { StateEntry } from './typings/state-entry';
import { NextStateMethod } from './typings/next-state-method';


@Injectable({ providedIn: 'root' })
export class ArcadeStateService {
  private static readonly getStatePollInterval: number = 3000;
  /* TODO  Apply shorter delay for set request */
  // private static readonly setStateDelay: number = 1000;

  private readonly arcadeStateInternal: BehaviorSubject<ArcadeState | null>;
  private readonly incomingUpdate: BehaviorSubject<void>;

  private nextStateMethod: NextStateMethod;
  private pendingStateUpdate: ArcadeState;

  public stateRefreshComplete: Subject<void>;

  public get arcadeState(): Observable<ArcadeState> {
    return this.arcadeStateInternal.pipe(
      skipWhile((arcadeState: ArcadeState | null) => arcadeState === null),
    );
  }

  public constructor(
    private arcadeStateParserService: StateMapperService,
    private stateResource: StateResource,
  ) {
    this.arcadeStateInternal = new BehaviorSubject<ArcadeState>(null);
    this.incomingUpdate = new BehaviorSubject<void>(undefined);

    this.nextStateMethod = NextStateMethod.Get;

    this.stateRefreshComplete = new Subject<void>();
  }

  public refreshState(): Observable<ArcadeState> {
    return iif(
      () => this.nextStateMethod === NextStateMethod.Get,
      defer(() => this.stateResource.getState()),
      defer(() => this.stateResource.setState(this.pendingStateUpdate)),
    ).pipe(
      tap((arcadeState: ArcadeState) => this.arcadeStateInternal.next(arcadeState)),
      tap((arcadeState: ArcadeState) => this.pendingStateUpdate = arcadeState),
      tap(() => this.nextStateMethod = NextStateMethod.Get),
      tap(() => this.stateRefreshComplete.next()),
    );
  }

  public updateStateEntry(stateEntry: StateEntry, state: any): void {
    this.pendingStateUpdate[stateEntry] = state;
    this.nextStateMethod = NextStateMethod.Set;
    this.incomingUpdate.next();
  }

  public initialize(): Observable<never> {
    return this.refreshState().pipe(
      concatMap(() => this.incomingUpdate),
      switchMap(() => interval(ArcadeStateService.getStatePollInterval).pipe(
        concatMap(() => this.refreshState()),
        concatMap(() => NEVER),
      )),
    );
  }
}
