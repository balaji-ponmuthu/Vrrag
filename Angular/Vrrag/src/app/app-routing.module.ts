import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { AuthGuard } from './auth-guards.services';
import { AnswerComponent } from './answer/answer.component';

const routes: Routes = [
  {path: '', component:HomeComponent, pathMatch:'full'},
  {path: 'answer/:id', component:AnswerComponent},
  {path: 'test', component:TestComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
