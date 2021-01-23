import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArcadeState } from '../../arcade-state/typings/arcade-state';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class StateResource {
  public constructor(
    private httpClient: HttpClient,
  ) {
  }

  public getState(): Observable<ArcadeState> {
    return this.httpClient.get<ArcadeState>(`${environment.resourceUrl}/get-state`);
  }

  public setState(state: ArcadeState): Observable<ArcadeState> {
    console.log(state);
    return this.httpClient.post<ArcadeState>(`${environment.resourceUrl}/set-state`, state);
  }
}
