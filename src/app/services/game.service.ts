import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, map } from 'rxjs';
import { Univers } from '../models/univers.enum';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) { }

  getGameData(univer: Univers | null): Observable<any> {
    if (!univer)
      return EMPTY;

    const gamesUrl = `assets/gameDatas/${univer}.json`;
    return this.http
      .get(gamesUrl)
      .pipe(map((data: any) => {
        return data || null
      }));
  }
}
