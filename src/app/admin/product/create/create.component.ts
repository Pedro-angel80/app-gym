import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoriaService } from '../../services/categoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public productForm: FormGroup<any> = this.fb.group({
    "name": ["", [Validators.required]],
    "state": ['', [Validators.required]],
    "price": ['', [Validators.required]],
    "description": ["Esta es una uva", [Validators.required]],
    "available": ['', [Validators.required]],
    "category": ['', [Validators.required]]
  })

  public categories: Array<any> = [];
  public productID: string = '';
  constructor(private serviceProduct: ProductService,
               private serviceCategory: CategoriaService,
               private fb: FormBuilder,
               private route: Router, 
               private activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.listCategory();
    //Obtener el parametro de la url
    this.activate.params.subscribe((param: Params) => {
      this.productID = param['productId']
    })
    this.loadProduc(this.productID);

  }

  create() {
    console.log(this.productForm.value);
    var category = this.productForm.value;
    if (this.productForm.valid) {
      this.serviceProduct.createProduct(category).subscribe(res => {
        if (res.ok) {      
          Swal.fire({
            title: 'Producto creado correctamente',
            text: "creado",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#2445d4',
            confirmButtonText: 'Terminar!',
            cancelButtonText: 'Alta producto!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.route.navigateByUrl('/admin/product');
            }else{
              window.location.reload();
            }
          })
        }
      }, (err) => {
        console.warn(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message,
          footer: '<a href="">Why do I have this issue?</a>'
        })
      })
    }
  }

  listCategory() {
    this.serviceCategory.readCategory().subscribe(res => {
      this.serviceCategory.readCategoryAll(res.total).subscribe(response => {
        this.categories = response.categories;
      })
    })
  }

  loadProduc(id: string){
    if (id !== undefined){      
      this.readProductById(id);
    }
  }

  readProductById(id: string){
    this.serviceProduct.readProdcutById(id).subscribe(res => {
      console.log(res);
      
      var {name, state, price, description, available, category} = res;
      this.productForm.setValue({name, state, price, description, available, category});
      
    })
  }

}
