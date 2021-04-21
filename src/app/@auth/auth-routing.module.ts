import { AuthComponent } from './auth.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:AuthComponent,
    children:[
      {
        path:'',
        component: LoginPageComponent
      },
      {
        path:'register',
        component:RegisterPageComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
