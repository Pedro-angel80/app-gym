import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/admin/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categories: Array<any> = [];
  actualPage: number = 0;
  constructor(private categoriServices: CategoriaService) { }

  ngOnInit(): void {
    this.readCategory()
  }

  readCategory(){
    this.categoriServices.readCategory().subscribe(res => {
      this.categoriServices.readCategoryAll(res.total).subscribe(response => {    
        this.categories = response.categories;
      })
    })
  }

  deleteCategory(categoryId: string) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriServices.deleteCategory(categoryId).subscribe((res) => {
          Swal.fire(
            '¡Eliminado!',
            'La categoria se ha eliminado',
            'success'
          )
          //Actualiza la lista de categorias
          this.readCategory();
        }, err => {
          console.warn(err);
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
