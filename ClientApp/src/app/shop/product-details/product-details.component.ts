import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  product!: Product | any;
  constructor(
    private shopService: ShopService, 
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService) {

  }
  ngOnInit(): void {
      this.loadProduct();
  }

  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) this.shopService.getProduct(+id).subscribe(
      response => {
        this.product = response;
        this.bcService.set('@productDetails', this.product.name);
      },
      error =>{
         console.log(error);
      }
    )
  }

}
