import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NgAntdModule } from './ng-antd.module';
import { SiderComponent } from './components/sider/sider.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { GroupComponent } from './views/group/group.component';
import { NameComponent } from './views/name/name.component';
import { LaundryComponent } from './views/laundry/laundry.component';

import { ChartsModule } from 'ng2-charts';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CreateGroupComponent } from './components/group/create-group/create-group.component';
import { UpdateGroupComponent } from './components/group/update-group/update-group.component';
import { CreateNameComponent } from './components/name/create-name/create-name.component';
import { UpdateNameComponent } from './components/name/update-name/update-name.component';
import { CreateLaundryComponent } from './components/laundry/create-laundry/create-laundry.component';
import { UpdateLaundryComponent } from './components/laundry/update-laundry/update-laundry.component';

@NgModule({
  declarations: [MainComponent, SiderComponent, HeaderComponent, DashboardComponent, GroupComponent, NameComponent, LaundryComponent, BreadcrumbComponent, CreateGroupComponent, UpdateGroupComponent, CreateNameComponent, UpdateNameComponent, CreateLaundryComponent, UpdateLaundryComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgAntdModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
  ]
})
export class MainModule { }
