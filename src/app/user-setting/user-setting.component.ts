import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServicesProvider } from '../providers/api-services/api-services';
import { HttpClient } from '@angular/common/http';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as _ from 'lodash';
import { PagedData } from '../models/paged-data';
import { Page } from '../models/page';
import { UserIndividual } from '../models/UserMangement';
import { UserSettingIndividual, UserClaim } from '../models/UserSetting';
import { FormGroup, FormControl, NgForm, FormBuilder, FormArray } from '@angular/forms';
import { SeekaConstants } from '../shared/SeekaConstants';
declare var $: any;

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss']
})

export class UserSettingComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  role: string = 'Administrator';
  accessPermission: string = 'write';
  currentpermission;
  currentUserId;
  @ViewChild('CheckBoxDataManagement') CheckBoxDataManagement;
  @ViewChild('CheckBoxUserManagement') CheckBoxUserManagement;
  @ViewChild('CheckBoxContentAdvertising') CheckBoxContentAdvertising;
  @ViewChild('CheckBoxSupport') CheckBoxSupport;
  @ViewChild('CheckBoxNotification') CheckBoxNotification;
  @ViewChild('CheckBoxOthers') CheckBoxOthers;
  @ViewChild('modalLarge') adminModal;
  UserData: any = {};
  currentUserEdit: any = {};
  UsersResponceArray: any = [];
  // category: any[] = ['DataManagement', 'UserManagement', 'ContentAdvertising',
  //   'Support', 'Notification', 'Others'];
  AllUsersClaims: any = [];


  allClaims: any[] = SeekaConstants.ALLCLAIMS;
  AllAdminUsersList: any = [];
  AllAdminUsersListSource: any[] = [];
  userFilter: any[] = [];
  statusFilter: any[] = [];
  roleFilter: any[] = [];

  rows = new Array<UserSettingIndividual>();
  page = new Page();
  public data: any = {};
  api_route: any = {};
  Userdetail: any;
  public rowsOnPage = 5;
  date: Date = new Date();
  settings = {
    bigBanner: false,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  }
  public scholarShipForm: FormGroup;
  public UserSettingSearchForm: FormGroup;
  userPersonalInfoForm: FormGroup;
  userRoleForm: FormGroup;
  userAccessPermissionForm: FormGroup;
  mangerForm: FormGroup;
  category = [
    { id: 1, name: 'DataManagement' },
    { id: 2, name: 'UserManagement' },
    { id: 3, name: 'ContentAdvertising' },
    { id: 4, name: 'Support' },
    { id: 5, name: 'Notification' },
    { id: 6, name: 'Others' }
  ];
  analystForm: FormGroup;
  userClaims: UserClaim[];

  @ViewChild('userPersonalInfoFormDirective') userPersonalInfoFormDirective: NgForm; // form
  @ViewChild('userRoleFormDirective') userRoleFormDirective: NgForm; // form  
  @ViewChild('userAccessPermissionFormDirective') userAccessPermissionFormDirective: NgForm; // form  

  @ViewChild('mangerFormDirective') mangerFormDirective: NgForm; // form  


  submit() {
    // Filter out the unselected ids
    console.log("into submitt.@#@#@#@......");
    console.log(this.mangerForm.value);
    const selectedPreferences = this.mangerForm.value.category
      .map((checked, index) => checked ? this.category[index] : null)
      .filter(value => value !== null);
    console.log(selectedPreferences);
  }


  constructor(public apiService: ApiServicesProvider, public httpClient: HttpClient, private fb: FormBuilder) {
    this.setPage({ offset: 0 });

    this.UserSettingSearchForm = new FormGroup({
      name: new FormControl(null),
      role: new FormControl(null),
      status: new FormControl(null),
      date: new FormControl(null),
    });

    this.userRoleForm = new FormGroup({
      rolename: new FormControl(null)
    });

    this.userAccessPermissionForm = new FormGroup({
      accessPermission: new FormControl(null)
    });

    this.userPersonalInfoForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      rolename: new FormControl(null),
      accessPermission: new FormControl(null)
    });

    const formControlsManager = this.category.map(control => new FormControl(false));
    this.mangerForm = this.fb.group({
      category: new FormArray(formControlsManager)
    });

    const formControlsAnalyst = this.allClaims.map(control => new FormControl(false));
    this.analystForm = this.fb.group({
      allClaims: new FormArray(formControlsAnalyst)
    });
  }

  ngOnInit() {
    // this.getUsers();
  }


  clearAll() {
    this.UserSettingSearchForm.reset();
  }

  /**
   * Function : To set the page size [rows par page]
   * @param event 
   */
  onPageSizeChanged(event) {
    this.rowsOnPage = event;
    // this.setPage({ offset: 0 }, this.searchDTO);
  }

  /**
 * Function : to sort the data in grid.
 */

  sortCallback(sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
    // there will always be one "sort" object if "sortType" is set to "single"
    console.log("into the sort functiona of the coure");
    console.log(sortInfo);
    // Call set page from here.
  }

  setPage(pageinfo) {
    this.page.pageNumber = pageinfo.offset;
    this.api_route.apiroute = 'users/pageNumber/' + (pageinfo.offset + 1) + '/pageSize/' + this.rowsOnPage;
    let data = this.apiService.getDataNewPort(this.api_route)
      .then((data: any) => {
        this.data = data;
        console.log("ALL RESULT OF THE USRSS...");
        console.log(data);
        this.getResults(this.page).subscribe(pagedData => {
          this.page = pagedData.page;
          this.rows = pagedData.data;
          console.log(this.rows);
        });
      }, (err) => {
        console.log(err)
      });
  }
  /**
   * A method that mocks a paged server response
   * @param page The selected page
   * @returns {any} An observable containing the employee data
   */
  public getResults(page: Page): Observable<PagedData<UserSettingIndividual>> {
    return of(this.data).pipe(map(data => this.getPagedData(page)));
  };

  /**
   * Package companyData into a PagedData object based on the selected Page
   * @param page The page data used to get the selected data from companyData
   * @returns {PagedData<UserSettingIndividual>} An array of the selected data and page
   */
  private getPagedData(page: Page): PagedData<UserSettingIndividual> {
    const pagedData = new PagedData<UserSettingIndividual>();
    page.size = this.rowsOnPage;
    page.totalElements = this.data.totalCount;
    page.totalPages = this.data.totalPages;
    const dataToIttrate = this.data.data;
    const array = [];
    const times = (this.rowsOnPage > page.totalElements) ? page.totalElements : this.rowsOnPage;

    for (let i = 0; i < times; i++) {
      const jsonObj = dataToIttrate[i];
      if (jsonObj) {
        const employee = new UserSettingIndividual(jsonObj.id,
          jsonObj.email,
          (jsonObj.firstName + ' ' + jsonObj.lastName),
          jsonObj.adminRole,
          jsonObj.signUpDate,
          jsonObj.status,
          null);
        array.push(employee);
      }
    }
    pagedData.data = array;
    pagedData.page = page;
    return pagedData;
  }

  roleChanged(role) {

    this.role = role;

    this.userPersonalInfoForm.value.rolename = role;

    // if (role == 'Manager') {
    //   setTimeout(() => {
    //     this.category.forEach(group => {
    //       let isAllChecked = true;
    //       this.allClaims.forEach(i => {
    //         if (!i.enabled && i.Category == group) {
    //           isAllChecked = false;
    //         }
    //       });
    //       this['CheckBox' + group].nativeElement.checked = isAllChecked;
    //       this.enableDisableByGroup(group, isAllChecked);
    //     })
    //   }, 500)
    // } else if (role == 'Administrator') {
    //   this.allClaims.forEach(i => {
    //     i.enabled = true;
    //   })
    // }
  }

  categoryCheckBoxChecked(id, value) {
    console.log("intot the mian check box category..");
    console.log(value);
    let write = this.currentpermission == 'write' ? true : false;
    let obj = {
      "name": value,
      "write": write
    }
    this.userClaims.push(obj);
  }

  accessPermissionChanged(permission) {
    this.currentpermission = permission;
    this.userPersonalInfoForm.value.accessPermission = permission;
  }

  enableDisableByGroup(group, enableDisable) {
    this.allClaims.forEach(i => {
      if (i.Category == group) {
        i.enabled = enableDisable;
      }
    })
  }

  checkGroupChecked(group: string, checkBoxInstance: any) {
    if (checkBoxInstance == "CheckBoxDataManagement") {
      this.enableDisableByGroup(group, this.CheckBoxDataManagement.nativeElement.checked);
    }
    if (checkBoxInstance == "CheckBoxContentAdvertising") {
      this.enableDisableByGroup(group, this.CheckBoxContentAdvertising.nativeElement.checked);
    }
    if (checkBoxInstance == "CheckBoxSupport") {
      this.enableDisableByGroup(group, this.CheckBoxSupport.nativeElement.checked);
    }
    if (checkBoxInstance == "CheckBoxUserManagement") {
      this.enableDisableByGroup(group, this.CheckBoxUserManagement.nativeElement.checked);
    }
    if (checkBoxInstance == "CheckBoxNotification") {
      this.enableDisableByGroup(group, this.CheckBoxNotification.nativeElement.checked);
    }
    if (checkBoxInstance == "CheckBoxOthers") {
      this.enableDisableByGroup(group, this.CheckBoxOthers.nativeElement.checked);
    }
  }

  openUserModal(user: any) {
    this.currentUserEdit = user;
    this.api_route.apiroute = 'admin/roles/claims/' + user.id;
    console.log(this.api_route)
    this.apiService.getData(this.api_route)
      .then((data: any) => {
        if (data && data.data) {

          this.allClaims.forEach(claim => {
            data.data.forEach(serverClaim => {
              if (claim.name == serverClaim.name) {
                claim.id = serverClaim.id;
                claim.enabled = true;
                claim.adminRoleId = serverClaim.adminRoleId;
                claim.write = serverClaim.write;
                claim.roleId = serverClaim.roleId;
                claim.userId = serverClaim.userId;
              }
            });
          })
        }
      });
    this.adminModal.show();
  }

  onChangeFilter(value: string) {
    if (value != "null") {
      this.AllAdminUsersList = this.AllAdminUsersListSource.filter(x => x.firstName.includes(value) ||
        (x.roles && x.roles[0] && x.roles[0].name == value)
        || (x.enabled.toString() == value));
    } else {
      // this.onReset();
      console.log("into else");
    }
  }

  ActiavteDeactivate($event, user) {
    console.log($event)
    console.log(user)
    if ($event == true) {
      this.api_route.apiroute = 'admin/user/active/' + user.id;
      console.log(this.api_route)
      this.apiService.putDataNew(this.api_route)
        .then((data: any) => {
          console.log(data)
        }, (err) => {
          console.log(err)
        })
    }
    else {
      this.api_route.apiroute = 'admin/user/deactive/' + user.id;
      console.log(this.api_route)
      this.apiService.putDataNew(this.api_route)
        .then((data: any) => {
          console.log(data)
        }, (err) => {
          console.log(err)
        })
    }
  }


  createUser() {
    console.log("user created....");
    console.log(this.mangerForm.controls.categryCheckbox);
    this.currentUserEdit = {};
    this.adminModal.show();
  }

  deleteUserById(userId) {
    this.api_route.apiroute = 'admin/user/' + userId + '/role/2';
    this.apiService.deletDataNew(this.api_route)
      .then((data: any) => {
        console.log("uer is deleted");
        alert("user Deleted");
      })
  }

  getUserById(userid) {
    console.log("inot the get user by id..");
    console.log(userid);
    this.currentUserId = userid.id;
    this.api_route.apiroute = 'admin/roles/claims/' + userid.id;
    this.apiService.getData(this.api_route)
      .then((data: any) => {
        console.log(" Data claims ", data);
        let allUserClaims = data.data;
        let accessPermission = data.data[0].write ? 'write' : 'readonly'
        this.userPersonalInfoForm.controls.rolename.setValue(data.data[0].adminRoleName);
        this.userPersonalInfoForm.controls.accessPermission.setValue(accessPermission);
        console.log('@#$@#$#@$#@$@$@#$@#$@$');
        console.log(this.userPersonalInfoForm);
        // this.mangerForm.patchValue(this.allClaims)
        // this.UsersResponceArray.forEach((users) => {
        //   if (users.roles && users.roles[0] && users.roles[0].name && users.roles[0].name == "Admin") {
        //     //this.AllAppUsersList.push(users)
        //     this.AllAdminUsersList.push(users);
        //     this.AllAdminUsersListSource.push(users);
        //     if (this.userFilter.indexOf(users.firstName) == -1) {
        //       this.userFilter.push(users.firstName);
        //     }
        //   }
      })

    this.adminModal.show();
    let x = userid.name.split(' ');
    this.userPersonalInfoForm.controls.firstName.setValue(x[0]);
    this.userPersonalInfoForm.controls.lastName.setValue(x[1]);
    this.userPersonalInfoForm.patchValue(userid);
  }

  saveUpdateUserClaims() {
    let reqDto = this.userPersonalInfoForm.value;
    let claimArray = [];
    let IsWrite = reqDto.accessPermission == 'readonly' ? false : true;

    if (reqDto.rolename == 'Administrator') {
      let reqToSend = reqDto;
    }
    else if (reqDto.rolename == 'Manager') {
      const selectedCategory = this.mangerForm.value.category
        .map((checked, index) => checked ? this.category[index].name : null)
        .filter(value => {
          if (value !== null) {
            this.allClaims.filter((val, index) => {
              if (val.Category == value) {
                let x = { name: val.name, write: IsWrite };
                claimArray.push(x);
              }
            })
          }
        });
    }
    else if (reqDto.rolename == 'Analyst') {
      this.analystForm.value.allClaims
        .map((checked, index) => {
          if (checked) {
            let x = { name: this.allClaims[index].name, write: IsWrite };
            claimArray.push(x);
          } else {
            null
          }
        })
        .filter(value => value !== null);
    }

    let dataToSend = {
      email: reqDto.email,
      user: {
        firstName: reqDto.firstName,
        lastName: reqDto.lastName,
        email: reqDto.email,
        enabled: true,
        password: reqDto.password,
        userType: 'Web',
        roles: [
          {
            id: 2
          }
        ]
      }
    }

    //if current user isnot there do, createUserAndUpdateClaim
    console.log("this.currentUserId", this.currentUserId);
    if (this.currentUserId && this.currentUserId !== "") {
      this.updateClaims(this.currentUserId, reqDto, claimArray);
    }
    else {
      this.createUserAndUpdateClaim(dataToSend, reqDto, claimArray)
    }

  }

  createUserAndUpdateClaim(dataToSend, reqDto, claimArray) {
    this.api_route.apiroute = 'users/signup';
    this.api_route.data = dataToSend
    this.apiService.setDataNewPort(this.api_route)
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          this.updateClaims(data.data.id, reqDto, claimArray)
        }
        else {
          alert(data.message);
          // this.getUsers();
          this.setPage({ offset: 0 });
          this.adminModal.hide();
          this.analystForm.reset();
          this.userAccessPermissionForm.reset();
          this.mangerForm.reset();
          this.userPersonalInfoForm.reset();
        }
      });
  }

  updateClaims(data, reqDto, claimArray) {
    let userId = data;
    this.api_route.apiroute = 'admin/roles/claims';
    let dataForRoleCreate = {
      userClaimsDtos: [
        {
          adminRoleName: reqDto.rolename,
          userClaims: claimArray
        }
      ],
      userId: userId
    }
    this.api_route.data = dataForRoleCreate
    this.apiService.setDataNewPort(this.api_route)
      .then((roleResponse) => {
        // this.getUsers();
        this.setPage({ offset: 0 });

        this.adminModal.hide();
      })
  }

  createOrUpdateUser(callback) {
    if (this.currentUserEdit.id) {
      this.updateUser(callback);
    } else {
      this.userRegister(callback);
    }

  }

  updateUser(callback: any) {
    this.api_route.apiroute = 'users/' + this.currentUserEdit.id;
    this.api_route.data = {
      email: this.currentUserEdit.email,
      user: {
        "citizenship": this.currentUserEdit.citizenship,
        "countryOrgin": this.currentUserEdit.countryOrgin,
        "dob": this.currentUserEdit.dob,
        "email": this.currentUserEdit.email,
        "firstName": this.currentUserEdit.firstName,
        "gender": this.currentUserEdit.gender,
        "lastName": this.currentUserEdit.lastName,
        "mobileNo": this.currentUserEdit.mobileNo,
        "status": true
      }
    };
    this.apiService.putDataNew(this.api_route)
      .then((data) => {
        callback({ create: false });
      });
  }

  userRegister(callback) {
    console.log(this.currentUserEdit)
    if (this.currentUserEdit.email) {
      if (this.currentUserEdit.firstName) {
        if (this.currentUserEdit.lastName) {
          this.currentUserEdit.dob = "";
          this.currentUserEdit.gender = "";
          this.currentUserEdit.signUpType = "SEEKA";
          this.currentUserEdit.socialAccountId = this.currentUserEdit.firstName
          this.currentUserEdit.status = true;
          this.currentUserEdit.username = this.currentUserEdit.firstName;
          this.currentUserEdit.userType = "Web";
          this.currentUserEdit.roles = [{
            "id": 2,
            "name": "Admin",
            "createdOn": "2019-07-18T15:19:06.000+0000",
            "updatedOn": "2019-07-18T15:19:06.000+0000",
            "deletedOn": null,
            "permission": [
              {
                "id": 1,
                "name": "can_create_user"
              },
              {
                "id": 2,
                "name": "can_update_user"
              },
              {
                "id": 3,
                "name": "can_read_user"
              },
              {
                "id": 4,
                "name": "can_delete_user"
              }
            ],
            "deleted": false
          }];
          let user = { user: this.currentUserEdit, email: this.currentUserEdit.email }
          this.api_route.apiroute = 'users/signup';
          this.api_route.data = JSON.stringify(user);
          console.log(this.api_route)
          this.apiService.NewSetDataLoad(this.api_route)
            .then((resp) => {
              console.log("User_data", resp);
              this.currentUserEdit = resp.data;
              callback({ create: true });
            }).catch((error) => {
              console.log('Error getting location', error);
            });

        } else {
          alert('Last Name Field Required')
        }
      } else {
        alert('First Name Field Required')
      }
    } else {
      alert('Email Field Required')
    }
  }
}