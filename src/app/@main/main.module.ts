import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NgAntdModule } from './ng-antd.module';
import { SiderComponent } from './components/sider/sider.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [MainComponent, SiderComponent, HeaderComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgAntdModule,
    FormsModule
  ]
})
export class MainModule { }
