import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7049/api/';

  constructor(private Http: HttpClient) { }
  getProducts() {
      return this.Http.get<IPagination>(this.baseUrl + 'Product');
  }
}
