import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/internal/operators';
import { deepClone } from 'src/app/shared/utils/object';
import { environment } from 'src/environments/environment';
import {
  Grocery,
  mapGroceryFromApp,
  mapGroceryFromServer,
  ServerGrocery,
} from '../../models/grocery';
@Injectable({
  providedIn: 'root',
})
export class GroceriesService {
  constructor(private readonly httpClient: HttpClient) {}

  getGroceries(page: number, favorites?: boolean, limit = 16) {
    let url = `${environment.baseUrl}?_page=${page}&_limit=${limit}`;
    if (favorites) {
      url += '&favorite=1';
    }
    return this.httpClient.get<ServerGrocery[]>(url).pipe(
      switchMap((serverGroceries: ServerGrocery[]) => {
        return from(serverGroceries || []).pipe(
          map((serverGrocery) => mapGroceryFromServer(serverGrocery)),
          toArray()
        );
      })
    );
  }

  favGrocery(grocery: Grocery) {
    const g: Grocery = deepClone(grocery);
    g.isFavorite = !grocery.isFavorite;

    const url = `${environment.baseUrl}/${grocery.id}`;
    const body: ServerGrocery = mapGroceryFromApp(g);

    return this.httpClient
      .patch<ServerGrocery>(url, body)
      .pipe(map((serverGrocery) => mapGroceryFromServer(serverGrocery)));
  }
}
