import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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


@NgModule({
  declarations: [MainComponent, SiderComponent, HeaderComponent, DashboardComponent, GroupComponent, NameComponent, LaundryComponent, BreadcrumbComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgAntdModule,
    FormsModule,
    ChartsModule
  ]
})
export class MainModule { }
