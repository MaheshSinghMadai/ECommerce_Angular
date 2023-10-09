import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product';
import { Pagination } from '../shared/models/pagination';
import { Brand } from '../shared/models/brands';
import { Types } from '../shared/models/types';
import { map } from 'rxjs';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:7049/api/';
  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if(shopParams.brandId !== 0) {
      params = params.append('brandId' ,shopParams.brandId.toString());
    }
    if(shopParams.typeId !== 0){
      params = params.append('typeId' , shopParams.typeId.toString());
    }
    if(shopParams.search){
      params = params.append('search' , shopParams.search);
    }

      params = params.append('sort' , shopParams.sort);
      params = params.append('pageIndex' , shopParams.pageNumber);
      params = params.append('pageSize' , shopParams.pageSize);
    
    return this.http.get<Pagination<Product>>(this.baseUrl + 'product', {params})
    .pipe(map(
      response => {
        return response;
      }
    ));
  } 

  getTypes() {
    return this.http.get<Types[]>(this.baseUrl + 'product/types');
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'product/brands');
  }
}
