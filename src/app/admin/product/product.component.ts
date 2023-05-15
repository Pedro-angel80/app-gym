import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Array<any> = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.readProduct().subscribe((res) => {
      console.log(res.categories);
      this.products = res.categories
    })
  }

}
