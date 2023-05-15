import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public formValid: boolean = true;
  users: Array<any> = [];
  formSearch: FormGroup<any> = this.fb.group({
    name: ['', Validators.required]
  })
  constructor(private fb: FormBuilder, private service: UserService) { }

  ngOnInit(): void {
    console.log("1",this.formSearch)
  }

  searchUser(){
    this.formValid = this.formSearch.valid;
    console.log("2",this.formSearch)
    if(this.formValid){
      this.service.userSearch(this.formSearch.value.name).subscribe(res => {
        if (res.data.length === 0){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sin resultados',
          })
        }else{
          this.users = res.data;
        }
        console.log(res);
      })
    }    
  }

}
