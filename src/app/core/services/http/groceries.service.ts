import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Grocery } from '../../models/grocery';

@Injectable({
  providedIn: 'root',
})
export class GroceriesService {
  constructor(private readonly httpClient: HttpClient) {}

  getGroceries(page: number, limit = 10) {
    return this.httpClient.get<Grocery[]>(
      `${environment.baseUrl}?_page=${page}&_limit=${limit}`
    );
  }
}
