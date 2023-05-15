import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userId: string = '';
  user: any;
  users: Array<any> = [];
  actualPage: number = 0;
  userTotal: any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.listUser();
  }

  deleteUser(user: any) {
    const idUser = user.uid;
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
        this.userService.deleteUser(idUser).subscribe((res) => {
          console.log(res);
          Swal.fire(
            '¡Eliminado!',
            'El usuario ha sido eliminado',
            'success'
          )
          this.listUser();
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
    console.log('Eliminando el usuario: ', user);
  }

  listUser(){
    this.userService.readUser().subscribe((res) => {      
      this.userTotal = res.total;
    })
    this.userService.readUserAll(this.userTotal).subscribe((res) => {     
      this.userRole(res.users); 
      this.users = res.users;
    })
  }

  editUser(user: any){
    console.log(user);
  }

  llenarDatosUser(user: any){
    console.log("Datos del llenado", user);
    this.userId = user.uid;
    this.user = user;
  }

  userRole(userList: Array<any>) {
    console.log("Probando lo que trae el USer:", userList);
    userList.forEach(res => {
      switch (res.role) {
        case 'ADMIN_ROLE':
          res.role = 'Admin';
          break;
        case 'USER_ROLE':
          res.role = 'Cliente';
          break;
        case 'SALES_ROLE':
          res.role = 'Ventas';
          break;
        default:
          res.role = 'Defaul';
      }
    })
    this.userStatus(userList);
  }

  userStatus(userList: Array<any>) {
    console.log("Probando lo que trae el USer:", userList);
    userList.forEach(res => {
      if (res.state) {
        res.state = 'Activo'
      }else {
        res.state = 'Inactivo'
      }
    })
    
  }

}
