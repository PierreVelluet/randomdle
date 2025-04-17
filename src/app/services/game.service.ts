import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, map } from 'rxjs';
import { Theme } from '../models/theme.enum';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) { }

  getGameData(theme: Theme | null): Observable<any> {
    if (!theme)
      return EMPTY;

    const gamesUrl = `assets/gameDatas/${theme}.json`;
    return this.http
      .get(gamesUrl)
      .pipe(map((data: any) => {
        return data || null
      }));
  }
}
