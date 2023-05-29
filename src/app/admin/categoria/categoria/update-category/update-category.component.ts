import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { CategoriaService } from 'src/app/admin/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  public cateId: string = '';
  public categoryForm: FormGroup<any> = this.fb.group({
    name: ['', [Validators.required]]
  })
  public formValid: boolean = true;
  constructor(private fb: FormBuilder, private service: CategoriaService, private route: Router, private ativate: ActivatedRoute) { }

  ngOnInit(): void {
    //Se recibe el parametro que viene de la URL 
    this.ativate.params.subscribe((params: Params) => {
      this.cateId = params['categoryId'];
      console.log('ID de la categoria:', this.cateId);  
    })
    this.loadCategory(this.cateId);
  }

  create(){
    this.formValid = this.categoryForm.valid;
    console.log('Click', this.categoryForm.valid, this.categoryForm.value);  
    if (this.formValid ){
      this.service.createCategory(this.categoryForm.value).subscribe(res => {
        if (res.ok) {
          Swal.fire({
            title: 'Categoria creada correctamente',
            text: "creado",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#2445d4',
            confirmButtonText: 'Terminar!',
            cancelButtonText: 'Crear categoria!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.route.navigateByUrl('/admin/category');
            }
          })
        } 
      }, (err) => {
        console.warn(err.error.error.errors[0]);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.error.errors[0].msg,
          footer: '<a href="">Why do I have this issue?</a>'
        })
      })       
    }
  }

  loadCategory(id: string){
    if (id !== undefined){
      console.log('Se esta actualizando un usuario');
      this.service.readCategoryById(id).subscribe(res => {
        console.log(res);
        var {name} = res;
        this.categoryForm.setValue({name});
        
      })
    }else{
      console.log('Se esta creando un usuario');
      
    }
  }
  
  updateCategory(){
    console.log('Actualizando...');    
    var category = this.categoryForm.value;
    this.service.updateCategory(this.cateId, category).subscribe(
      (res) => {
        if (res.ok) {
          Swal.fire(
            'Categoria actualizada correctamente',
            'Click para continuar!',
            'success'
          ).then((res) => {
            this.route.navigateByUrl('/admin/category');
          });
        }
      },
      (err) => {
        console.warn(console.log('Error al actualizar', err));
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      });
  }
}
