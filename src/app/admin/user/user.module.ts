import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [UserComponent, CreateComponent, UpdateComponent, SearchComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class UserModule { }
