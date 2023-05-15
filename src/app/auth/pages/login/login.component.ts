import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthdService } from '../../services/authd.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    email: ['angel.b905@gmail.com', [Validators.required, Validators.email]],
    password: ['nuevaContraseña', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder, private router: Router, private authServices: AuthdService) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.miFormulario.value);
    this.authServices.login(this.miFormulario.value).subscribe(res => {
      console.log(res === true);
      if(res === true){
        localStorage.setItem('user', JSON.stringify(this.authServices.user));
        this.router.navigateByUrl('/admin')
      }else {
        Swal.fire({
          title: 'Error...',
          text: res,
          icon: 'error'
        })
      }
    })
  }

}
