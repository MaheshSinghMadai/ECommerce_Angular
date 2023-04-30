import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IProductType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7049/api/';

  constructor(private Http: HttpClient) { }

  getProducts(shopParams : ShopParams){
    let params = new HttpParams();

      if(shopParams.brandId !== 0){
        params = params.append('brandId', shopParams.brandId.toString());
      }

      if(shopParams.typeId !== 0){
        params = params.append('typeId', shopParams.typeId.toString());
      }

      params = params.append('sort', shopParams.sort);
   
      params = params.append('pageIndex', shopParams.pageNumber.toString());
      params = params.append('pageSize', shopParams.pageSize.toString());
      
    return this.Http.get<IPagination>(this.baseUrl + 'Product?pageSize=50',{observe:'response',params})
      .pipe(
        map(response => {
          return response.body
        })
      )
  }
  
  getBrands() {
    return this.Http.get<IBrand[]>(this.baseUrl + 'Product/brands');
  }

  getProductTypes() {
    return this.Http.get<IProductType[]>(this.baseUrl + 'Product/types');
  }

}
