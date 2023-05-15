import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  userId: string = '';
  user: any;
  roleUser: string = '';
  public formSubmitted = false;
  formUpdate: FormGroup<any> = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    role: [''],
    google: [''],
    state: [''],
  });
  constructor(
    private fb: FormBuilder,
    private serviceUser: UserService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.userId = params['user'];
      console.log('Este es el param: ', this.userId);
    });
    this.loadUser();
  }

  updateConfirm() {
    Swal.fire({
      title: '¿Desea actualizar el usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateUser();
      }
    });
  }

  updateUser() {
    this.formSubmitted = true;
    console.log(this.formUpdate.controls);

    if (this.formUpdate.valid) {
      this.userRoleAssignment();
      console.log('Formulario es valido: ', this.formUpdate.value);
      this.serviceUser.updateUser(this.userId, this.formUpdate.value).subscribe(
        (res) => {
          console.log('Respuesta: ', res);
          if (res.ok) {
            Swal.fire(
              'Usuario actualizado correctamente',
              'Click para continuar!',
              'success'
            ).then((res) => {
              this.redirectUserList();
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
        }
      );
    }
  }

  loadUser() {
    this.serviceUser.getUserById(this.userId).subscribe((res) => {
      this.user = res.data;
      console.log("loadUser",res.data[0]);
      var role = res.data[0].role != null ||  res.data[0].role != undefined ? res.data[0].role : '';
      var { name, email, google, state } = res.data[0];
      this.userRole(res.data[0]);
      this.formUpdate.setValue({ name, email, role, google, state });
    });
  }

  redirectUserList() {    
    this.route.navigateByUrl('/admin/user');
  }

  userRoleAssignment() {
    switch (this.formUpdate.get('role')?.value) {
      case 'Admin':
        this.formUpdate.value.role = 'ADMIN_ROLE';
        break;
      case 'Cliente':
        this.formUpdate.value.role = 'USER_ROLE';
        break;
      case 'Ventas':
        this.formUpdate.value.role = 'SALES_ROLE';
        break;
      default:
        this.formUpdate.value.role = 'USER_ROLE';
    }
  }

  userRole(user: any) {
    console.log("Probando lo que trae el USer:", user.role);    
    switch (user.role) {
      case 'ADMIN_ROLE':
        this.roleUser = 'Admin';
        break;
      case 'USER_ROLE':
        this.roleUser = 'Cliente';
        break;
      case 'SALES_ROLE':
        this.roleUser = 'Ventas';
        break;
      default:
        this.roleUser = 'Defaul';
    }
  }
  
}
