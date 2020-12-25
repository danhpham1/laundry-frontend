import { NgModule } from '@angular/core';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from '../icons-provider.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
    imports: [
        NzLayoutModule,
        NzMenuModule,
        IconsProviderModule,
        NzBreadCrumbModule,
        NzTableModule,
        NzDropDownModule,
        NzButtonModule,
        NzPopoverModule,
        NzModalModule,
        NzFormModule
    ],
    exports: [
        NzLayoutModule,
        NzMenuModule,
        IconsProviderModule,
        NzBreadCrumbModule,
        NzTableModule,
        NzDropDownModule,
        NzButtonModule,
        NzPopoverModule,
        NzModalModule,
        NzFormModule
    ]
})

export class NgAntdModule { }