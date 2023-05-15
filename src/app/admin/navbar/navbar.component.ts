import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private _user: any = JSON.parse(localStorage.getItem('user')!);
  public userName: string = this._user.userName;
  public image: string = '';
  constructor(private route: Router, private service: UserService) {  }

  ngOnInit(): void {
    console.log("NAVBAR", this.getUserById());
    
    
  }

  logout(){
    localStorage.clear();
    this.route.navigateByUrl('/auth/login')
  }

  getUserById(){
    this.service.getUserById(this._user.id).subscribe(res => {
      this.image = res.data[0].picture;
      console.log(this.image)
    })
  }
}
