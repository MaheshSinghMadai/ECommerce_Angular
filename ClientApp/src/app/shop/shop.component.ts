import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Brand } from '../shared/models/brands';
import { Types } from '../shared/models/types';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  
  products: Product[] | any;
  brands: Brand[] = [] ;
  types: Types[] =[];
  brandIdSelected : any;
  typeIdSelected: any

  constructor(private shopService: ShopService) { }
  
  ngOnInit() {
   this.getProducts();
   this.getBrands();
   this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected).subscribe(
      response => {
        this.products = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  getBrands() {
    this.shopService.getBrands().subscribe(
     response => {
       this.brands = [{id:0, name:'All'}, ...response];
       console.log(response)
     },
     error => {
      console.log(error);
     }
   )
 }

 getTypes() {
  this.shopService.getTypes().subscribe(
   response => {
     this.types = [{id:0, name:'All'}, ...response];
     console.log(response)
   },
   error => {
    console.log(error);
   }
 )
}

  onBrandsSelected(brandId: number){
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    this.typeIdSelected = typeId;
    this.getProducts();
  }

}
