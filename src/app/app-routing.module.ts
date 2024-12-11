import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogFoodComponent } from './components/log-food/log-food.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'logFood', pathMatch: 'full', component: LogFoodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
