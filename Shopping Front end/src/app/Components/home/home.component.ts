import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Product } from 'src/app/Model/product';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  minAmount: Number;
  maxAmount: Number;
  right: any;
  left: any;
  priceGap: 500;

  constructor(private api: ApiService) {
    this.minAmount = 2500;
    this.maxAmount = 7500;

   }

  ngOnInit() {
    if (this.api.isAuthenticated) {
      this.api.getProducts().subscribe(
        res => {
          this.products = res.oblist;
        }
      );
    }
  }


  addToCart(e) {
    this.api.addToCart(e).subscribe(res => {
      console.log(res);
    })
  }

  searchByName(e){
    // console.log(e);
    this.api.searchProductByName(e).subscribe(res => {
      this.products = res.oblist;
      
    })
    
  }

  searchByMinAmount(e){
    this.minAmount = e;
    this.left = (<number> this.minAmount / 10000) + "%";
    console.log(e);
  }
  searchByMaxAmount(e){
    this.maxAmount = e;
    this.right = 100 - (<number>this.maxAmount / 10000) * 100 + "%";
    console.log(e);
  }


}
