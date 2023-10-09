import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product';
import { Observable, map } from 'rxjs';
import { Pagination } from '../shared/models/pagination';
import { Brand } from '../shared/models/brands';
import { Types } from '../shared/models/types';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:7049/api/';
  constructor(private http: HttpClient) { }

  getProducts(brandId? : number, typeId?:number) {
    let params = new HttpParams();

    if(brandId){
      params = params.append('brandId' ,brandId);
    }
    if(typeId){
      params = params.append('typeId' , typeId);
    }
    
    return this.http.get<Pagination<Product>>(this.baseUrl + 'product', {observe: 'response', params})
              .pipe(map(response => {
                return response;
              }
            ))
  }

  getTypes() {
    return this.http.get<Types[]>(this.baseUrl + 'product/types');
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'product/brands');
  }
}
