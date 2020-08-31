import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './user/user.component';
import {RepositoryComponent} from './repository/repository.component';
import { FooterComponent } from './components/footer/footer.component';
const routes: Routes = [
  { path: 'user', component: UserComponent},
  { path: 'repository', component:RepositoryComponent},
  { path: 'footer', component:FooterComponent},
  

  { path: '', redirectTo:"/user", pathMatch:"full"},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
