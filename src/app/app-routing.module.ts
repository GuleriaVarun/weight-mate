import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogFoodComponent } from './components/log-food/log-food.component';
import { LoginComponent } from './components/v2/login/login.component';
import { UserDetailsComponent } from './components/v2/user-details/user-details.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'home', pathMatch: 'full' , component: HomeComponent },
  { path: 'logFood', pathMatch: 'full', component: LogFoodComponent},
  { path: 'addDetails', pathMatch: 'full', component: UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
