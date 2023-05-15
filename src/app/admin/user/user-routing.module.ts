import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'update/:user',
    component: UpdateComponent
  },
  {
    path: 'search',
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
