import { ToDo } from './../models/ToDO';
import { Component, OnInit } from '@angular/core';
import { ApiServicesProvider } from '../providers/api-services/api-services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { AlertService } from '../shared/utilityServices/AlertService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  api_route: any = {};
  userList = [];
  folderList = [];
  toDoList: ToDo[] = [];
  todoForm: FormGroup;
  todoData: ToDo = new ToDo();
  toDoContainList: ToDo[] = [];
  date: Date = new Date();
  settings = {
    bigBanner: false,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  }

  constructor(private router: Router, public apiProvider: ApiServicesProvider, private confirmationDialogService: ConfirmationDialogService,
    private alertService: AlertService) {
    this.todoForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      folderId: new FormControl(null, Validators.required),
      userId: new FormControl(null, Validators.required),
      dueDate: new FormControl(null, Validators.required),
    })
  }
  ngOnInit() {
    this.getFolderList();
    this.getUserList();
    this.getTodoListByUser();
  }

  redirectToDeshboard(to){  
    if (!this.todoForm.touched) {
      if (to == 'dashboard') { this.router.navigate(['dashboard']); }      
    }
    else {
      this.confirmationDialogService.confirm('Please Save Changes', 'Please save changes for batter experience.')
        .then((confirmed) => {
          if (confirmed) {
            this.todoForm.valid && this.onSubmit()
            if (to == 'dashboard') { this.router.navigate(['dashboard']); }            
          }
          else {
            if (to == 'dashboard') { this.router.navigate(['dashboard']); }            
          }
          console.log('User confirmed:', confirmed)
        });
    }
  }

  getFolderList() {
    this.api_route.apiroute = 'article/folder/all';
    this.apiProvider.getDataNewUrl(this.api_route).then((res: any) => {
      this.folderList = res['data'];
    }, (err) => {
      console.log(err);
    })
  }

  getUserList() {
    this.api_route.apiroute = 'users';
    this.apiProvider.getDataNewPort(this.api_route).then(res => {
      this.userList = res.data;
    }, (err) => {
      console.log(err);
    });
  }

  getTodoListByUser() {
    this.api_route.apiroute = 'todo/user/' + localStorage.getItem('userId');
    this.apiProvider.getDataNewUrl(this.api_route).then((res: any) => {
      this.toDoList = res['data'];
      this.toDoContainList = res['data'];
    }, (err) => {
      console.log(err);
    })
  }

  onSubmit() {
    if (!this.todoData.id) {
      console.log(this.todoForm.value);
      let data = <ToDo>this.todoForm.value;
      let dueDate = this.convertToMMDDYYYY(data.dueDate);
      data.dueDate = dueDate;
      this.api_route.apiroute = 'todo'
      this.api_route.data = data;
      this.apiProvider.setDataNewUrl(this.api_route).then((res: any) => {
        alert(res['message']);
        this.getTodoListByUser();
        this.todoForm.reset();
        this.todoData = new ToDo();
      }, (err) => {
        console.log(err);
      })
    } else {
      console.log(this.todoForm.value);
      let data = <ToDo>this.todoForm.value;
      let dueDate = this.convertToMMDDYYYY(data.dueDate);
      data.dueDate = dueDate;
      this.api_route.apiroute = 'todo/' + this.todoData.id;
      this.api_route.data = data;
      this.apiProvider.updateDataNewUrl(this.api_route).then((res: any) => {
        alert(res['message']);
        this.getTodoListByUser();
        this.todoForm.reset();
        this.todoData = new ToDo();
      }, (err) => {
        console.log(err);
      })
    }

  }

  onClickNewTodo() {
    this.todoForm.reset();
    this.todoData = new ToDo();
  }

  getTodoDetailById(id) {
    this.api_route.apiroute = 'todo/' + id;
    this.apiProvider.getDataNewUrl(this.api_route).then((res: any) => {
      this.todoForm.patchValue(res['data']);
      this.todoData = res['data'];
      if (this.todoData.dueDate) {
        let date = this.convertToYYYYMMDD(this.todoData.dueDate);
        this.todoForm.controls['dueDate'].setValue(date);
      }
    }, (err) => {
      console.log(err);
    })
  }

  deleteTodo(id) {
    console.log("intot the delete tdo function...");
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to Delete Todo ?')
      .then((confirmed) => {
        if (confirmed) {
          this.api_route.apiroute = 'todo/' + id;
          this.apiProvider.deleteDataNewUrl(this.api_route).then((res: any) => {
            this.alertService.showMessage(res['message'], 200);
            this.onClickNewTodo();
            this.getTodoListByUser();
          }, (err) => {
            console.log(err);
          })
        }
        else {
          this.alertService.showMessage("Todo Delete Fail", 400);
        }
        console.log('User confirmed:', confirmed)
      })
      .catch(() => {
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)');
        this.alertService.showMessage("Todo Delete Fail", 400);
      });
    console.log("delete to do ", id);
  }

  convertToMMDDYYYY(value) {
    let date = new Date(value);
    return ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1) + '/' + ((date.getDate()) < 10 ? '0' : '') + (date.getDate()) + '/' + date.getFullYear();
  }

  convertToYYYYMMDD(value) {
    let date = new Date(value);
    return date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1) + '-' + ((date.getDate()) < 10 ? '0' : '') + (date.getDate());
  }

  onInputSearch(event) {
    if (event.target.value) {
      this.toDoList = this.toDoList.filter(x => x.title.includes(event.target.value));
    } else {
      this.toDoList = this.toDoContainList;
    }
  }

}
