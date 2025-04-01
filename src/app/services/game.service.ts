import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gamesUrl = 'assets/games.json';

  constructor(private http: HttpClient) {}

  getGameData(gameKey: string): Observable<any> {
    return this.http
      .get(this.gamesUrl)
      .pipe(map((data: any) => data[gameKey] || null));
  }
}
