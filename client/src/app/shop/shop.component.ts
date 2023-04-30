import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IProductType } from '../shared/models/productType';
import { IBrand } from '../shared/models/brand';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: IProduct[]= [];
  brands: IBrand[] =[];
  types: IProductType[] =[];
  brandIdSelected = 0;
  typeIdSelected = 0;
  sortSelected = 'name';
  shopParams = new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'},
  ];
  totalCount = 0;


  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes(); 
  }
  
  getProducts(){
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
  )}

  getBrands(){
    this.shopService.getBrands().subscribe(
      response => {
         this.brands = [{id:0, name:'All'}, ...response];
      },
      error => {
        console.log(error);
      }
    )}

    getTypes(){
      this.shopService.getProductTypes().subscribe(
        response => {
           this.types = [{id:0,name:'All'}, ...response];
        },
        error => {
          console.log(error);
        }
      )}

    onBrandSelected(brandId: number){
        this.shopParams.brandId = brandId;
        this.getProducts();
    }

    onTypeSelected(typeId: number){
      this.shopParams.typeId = typeId;
      this.getProducts();
    }

    onSortSelected(sort: string){
      this.shopParams.sort = sort;
      this.getProducts();
    }

    onPageChanged(event : any){
      if (this.shopParams.pageNumber !== event) {
            this.shopParams.pageNumber = event;
            this.getProducts();
        }
    }

    onSearch(){
      this.shopParams.search = this.searchTerm.nativeElement.value;
    }

    onReset(){
      this.searchTerm.nativeElement.value = '';
      this.shopParams = new ShopParams();
      this.getProducts();
    }
}
