import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Brand } from '../shared/models/brands';
import { Types } from '../shared/models/types';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] | any;
  brands: Brand[] = [] ;
  types: Types[] =[];
  shopParams = new ShopParams();
  totalCount = 0 ;

  sortOptions = [
    {name:'Alphabetical', value:'name'},
    {name:'Price Ascending', value:'priceAsc'},
    {name:'Price Descending', value:'priceDsc'},
  ]

  constructor(private shopService: ShopService) { }
  
  ngOnInit() {
   this.getProducts();
   this.getBrands();
   this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(
      response => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
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
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event:any){
    this.shopParams.pageNumber = event.number;
    this.getProducts();
  }

  onSearch(){
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value = "";
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
