import { DataTableModule } from 'angular2-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSettingRoutingModule } from './user-setting-routing.module';
import { UserSettingComponent } from './user-setting.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '../theme/forms/forms.module';
import { UiSwitchModule } from 'ng2-ui-switch';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

@NgModule({
  declarations: [UserSettingComponent],
  imports: [
    CommonModule,
    UserSettingRoutingModule,
    SharedModule,
    HttpClientModule, NgxPaginationModule,
    DataTableModule,
    FormsModule,
    UiSwitchModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    AngularDateTimePickerModule
  ]
})
export class UserSettingModule { }
