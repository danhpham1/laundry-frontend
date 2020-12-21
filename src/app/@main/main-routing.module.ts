import { LaundryComponent } from './views/laundry/laundry.component';
import { NameComponent } from './views/name/name.component';
import { GroupComponent } from './views/group/group.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'groups',
        component: GroupComponent,
      },
      {
        path: 'names',
        component: NameComponent,
      },
      {
        path: 'laundries',
        component: LaundryComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
