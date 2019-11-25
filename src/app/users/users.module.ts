import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {DataTableModule} from 'angular2-datatable';
import {UiSwitchModule} from 'ng2-ui-switch';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxCarouselModule} from 'ngx-carousel';
import 'hammerjs';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [UsersComponent],
  
  providers: [ ConfirmationDialogService ],
  entryComponents: [ ConfirmationDialogComponent ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    NgxDatatableModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    HttpClientModule,
    NgxCarouselModule,
    NgxDatatableModule,
    AngularDateTimePickerModule
  ]
})
export class UsersModule { }
