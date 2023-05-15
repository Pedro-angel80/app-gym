import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public formSubmitted = false;
  formCreate: FormGroup<any> = this.fb.group({
    name: ['pedro01', [Validators.required]],
    email: ['pedro01@email.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['123456', [Validators.required, Validators.minLength(6)]],
    role: [''],
    google: [''],
  }, {
    Validators: this.equalsPassword('password', 'passwordConfirm')
  })
  constructor(private fb: FormBuilder, private serviceUser: UserService, private route: Router) {}
  ngOnInit(): void {
  }

  create (){
    this.formSubmitted = true;
    console.log('Formulario es valido: ', this.formCreate.valid);
    console.log('Formulario es valido: ', this.formCreate.value);
    if (this.formCreate.valid){
      this.userRoleAssignment();
      console.log('Formulario es valido: ', this.formCreate.value);
      this.serviceUser.createUser(this.formCreate.value).subscribe(res => {
        if (res.ok) {
          Swal.fire({
            title: 'Usuario creado correctamente',
            text: "creado",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#2445d4',
            confirmButtonText: 'Terminar!',
            cancelButtonText: 'Crear usuario!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.redirectUserList();
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
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Formulario invalido",
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }

  validPassword (){
    const pass1 = this.formCreate.get('password')?.value;
    const pass2 = this.formCreate.get('passwordConfirm')?.value;
    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    }else{
      return false;
    }
  }

  equalsPassword(pass1: string, pass2: string)  {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control === pass2Control){
        pass2Control?.setErrors(null);
      }else {
        pass2Control?.setErrors({noEsIgual: true});
      }
    }
  }

  userRoleAssignment() {
    switch (this.formCreate.get('role')?.value) {
      case 'Admin':
        this.formCreate.value.role = 'ADMIN_ROLE';
        break;
      case 'Cliente':
        this.formCreate.value.role = 'USER_ROLE';
        break;
      case 'Ventas':
        this.formCreate.value.role = 'SALES_ROLE';
        break;
      default:
        this.formCreate.value.role = 'USER_ROLE';
    }
  }

  redirectUserList() {    
    this.route.navigateByUrl('/admin/user');
  }
}
