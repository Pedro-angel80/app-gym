import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/admin/services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categories: Array<any> = [];
  constructor(private categoriServices: CategoriaService) { }

  ngOnInit(): void {
    this.categoriServices.readCategory().subscribe(res => {
      this.categories = res.categories;
    })
  }

}
