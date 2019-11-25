import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { SharedModule } from '../shared/shared.module';
import { TodoRoutingModule } from './todo-routing-module';
import { QuillEditorModule } from 'ngx-quill-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

@NgModule({
  declarations: [TodoComponent],
  providers: [ ConfirmationDialogService ],
  entryComponents: [ ConfirmationDialogComponent ],
  imports: [
    CommonModule,
    SharedModule,
    TodoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillEditorModule,
    AngularDateTimePickerModule
  ]
})
export class TodoModule { }
