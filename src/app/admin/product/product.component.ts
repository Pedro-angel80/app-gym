import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Array<any> = [];
  actualPage: number = 0;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.readProductAll();
  }

  readProductAll(){
    this.productService.readProduct().subscribe((res) => {
      console.log(res);      
      var total: number = res.total;
      this.productService.readProductAll(total).subscribe(r => {
        console.log(r);
        
        this.products = r.categories
      })
    })
  }

  deleteProduct(productId: string){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        this.productService.deleteProdcut(productId).subscribe((res) => {
          console.log(res);
          Swal.fire(
            '¡Eliminado!',
            'El usuario ha sido eliminado',
            'success'
          )
          this.readProductAll();
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Error el eliminar el usuario",
            footer: '<a href="">Why do I have this issue?</a>'
          })
        })
      }
    })
  }

}
