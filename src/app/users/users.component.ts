import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { EnrollmentIndividual } from '../models/Enrolment.';
import { AlertService } from '../shared/utilityServices/AlertService';
import { ApiServicesProvider } from '../providers/api-services/api-services';
import { Page } from '../models/page';
import { PagedData } from '../models/paged-data';
import { Observable, of, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

import { UserIndividual, UserDeviceDetail, User, UserSearchDTO } from '../models/UserMangement';
import { ThrowStmt } from '@angular/compiler';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Router } from '@angular/router';
import { SeekaConstants } from '../shared/SeekaConstants';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  rows = new Array<UserIndividual>();

  page = new Page();
  public data: any = {};
  api_route: any = {};
  UserDivShow = 'ListUser'
  userPersonalInfoForm: FormGroup;
  userEducationQualificationForm: FormGroup;
  userAchivementsForm: FormGroup;
  userSubjectGreadForm: FormGroup;
  userSearchForm: FormGroup;

  @ViewChild('userPersonalInfoFormDirective') userPersonalInfoFormDirective: NgForm; // form
  @ViewChild('userSearchFormDirective') userSearchFormDirective: NgForm; // form

  @ViewChild('userEducationQualificationFormDirective') userEducationQualificationFormDirective: NgForm; // form  
  @ViewChild('userAchivementsFormDirective') userAchivementsFormDirective: NgForm; // form
  @ViewChild('userSubjectGreadFormDirective') userSubjectGreadFormDirective: NgForm; // form  

  disableUserPersonalInfo: boolean = true;
  disableUserEducationQualificationInfo: boolean = true;
  disableUserAchivementsInfo: boolean = true;

  subjectGreadArray: any = [];
  studentEducation: any = [];
  CountryResponceObj: any[] = [];
  CityResponseObj: any[] = [];
  LevelResponceObj: any[] = [];
  EducationSystemResponseObj: any[] = [];
  EducationAcivementArray: any[] = [];
  WholeUserProfile;
  AllSubjects: any[] = [];
  UserDeviceDetailObj = new UserDeviceDetail();
  noDeviceDetailObj: UserDeviceDetail = {
    id: 0,
    userId: 0,
    deviceId: 0,
    sdkVersionCode: "-",
    appVersion: '-',
    osVersion: '-',
    model: '-',
    platform: '-',
    ipAddress: '-',
    pushNotification: false,
    firstName: '-',
    lastName: '-',
    email: '-',
    mobileNo: '-',
    userSessionId: 0,
  }

  // public data: Observable<UsersComponent>;
  public rowsOnPage = 5;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public Userdetail;
  public userName: string;
  public userID: string;
  public userProPic: string;
  public userEmail: string;
  public userPosition: string;
  public userOffice: string;
  public userAge: number;
  public userContact: string;
  public userDate: string;
  @Input('modalDefault') modalDefault: any;

  rowsBasic = [];
  fullScreenRow = [];
  loadingIndicator = true;
  reorderable = true;

  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  limitOptions = SeekaConstants.LimitOptions;

  // rows = [];
  expanded = {};
  timeout: any;
  rowsFilter = [];
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  ArticleDivShow: any;
  FilterView: string;
  isHighschool: boolean;
  StatusList=[{name:'Active' , value:'active'}, {name:'DeActive' , value:'deactive'}]

  date: Date = new Date();
  settings = {
    bigBanner: false,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  }

  constructor(public httpClient: HttpClient, private router: Router,private spinnerService: Ng4LoadingSpinnerService,
    private apiService: ApiServicesProvider, private confirmationDialogService: ConfirmationDialogService,
    private alertService: AlertService) {
    this.fetchBasicData((data) => {
      this.rowsBasic = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });

    this.userPersonalInfoForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      countryOrgin: new FormControl(null, Validators.required),
      citizenship: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      mobileNo: new FormControl(null, Validators.required),
      skypeId: new FormControl(null, Validators.required)
    });

    this.userEducationQualificationForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      educationLevelId: new FormControl(null, Validators.required),
      educationCountryId: new FormControl(null, Validators.required),
      educationSystemId: new FormControl(null, Validators.required),
      isEnglishMedium: new FormControl(null, Validators.required),
      educationInstitue: new FormControl(null, Validators.required),
      fromDuration: new FormControl(null, Validators.required),
      toDuration: new FormControl(null, Validators.required),
      gpaScore: new FormControl(null, Validators.required)
    });

    this.userAchivementsForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      authorityIssued: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      month: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required)
    });

    this.userSubjectGreadForm = new FormGroup({
      subjectId: new FormControl(null, Validators.required),
      grade: new FormControl(null, Validators.required)
    })

    this.userSearchForm = new FormGroup({
      country: new FormControl(null),
      city: new FormControl(null),
      signUpDate: new FormControl(null),
      status: new FormControl(null),
      searchKeyword: new FormControl(null),
      sortByField: new FormControl(null),
      sortByType: new FormControl(null)
    });
    this.userPersonalInfoForm.disable();
    this.userAchivementsForm.disable();
    this.userEducationQualificationForm.disable();
    this.setPage({ offset: 0 }, new UserSearchDTO());

  }

  public count = 0;
  ngAfterViewChecked() {
    console.log("####### ngDoCheck", this.count)
    if (this.count == 0) {
      console.log(this.userSearchForm);
      this.userSearchForm.reset();
      // this.userSearchForm.controls.status.setValue('null')
    }
    console.log(this.userSearchForm);
    this.count++;
  }


  doToggleView(element) {
    if (element == 'userPersonalInfoForm') {
      this.userPersonalInfoForm.disabled ? this.userPersonalInfoForm.enable() : this.userPersonalInfoForm.disable();
    } else if (element == 'userEducationQualificationForm') {
      this.userEducationQualificationForm.disabled ? this.userEducationQualificationForm.enable() : this.userEducationQualificationForm.disable();
    }
    else {
      this.userAchivementsForm.disabled ? this.userAchivementsForm.enable() : this.userAchivementsForm.disable();
    }
  }

  redirectToDeshboard(to) {  
    if (!this.userAchivementsForm.touched && !this.userAchivementsForm.touched && !this.userAchivementsForm.touched) {
      if (to == 'dashboard') { this.router.navigate(['dashboard']); }
      else {
        this.UserDivShow = to;
      }
    }
    else {
      this.confirmationDialogService.confirm('Please Save Changes', 'Please save changes for batter experience.')
        .then((confirmed) => {
          if (confirmed) {
            if (to == 'dashboard') { this.router.navigate(['dashboard']); }
            else {             
              this.UserDivShow = to;
            }
          }
          else {
            if (to == 'dashboard') { this.router.navigate(['dashboard']); }
            else {
              this.UserDivShow = to;
            }
          }
          console.log('User confirmed:', confirmed)
        });
    }
  }

  levelChanged(data) {
    console.log("level Changed");
    console.log(data);
    this.isHighschool = true;
  }

  public searchDTO;
  onFilterInstitution(pageInfo) {
    this.searchDTO = <UserSearchDTO>this.userSearchForm.value;
    if (pageInfo) {
      this.setPage(pageInfo, this.searchDTO);
    } else {
      this.setPage({ offset: 0 }, this.searchDTO);
    }
  }

  /**
   * Function : To set the page size [rows par page]
   * @param event 
   */
  onPageSizeChanged(event) {
    console.log("page changedd...");
    console.log(event);
    this.rowsOnPage = event;
    this.setPage({ offset: 0 }, new UserSearchDTO());
  }

  setDotForSelectedSort(name) {
    console.log("into the all dots.");
    console.log(name);

    if (document.getElementsByClassName('sort-selection-dot').length > 0) {
      document.getElementsByClassName('sort-selection-dot')[0].removeAttribute('class');
      document.getElementById(name + '-dot').setAttribute('class', 'sort-selection-dot');
    }
    else {
      document.getElementById(name + '-dot').setAttribute('class', 'sort-selection-dot');
    }
  }

  sortSelection(name) {
    console.log("###", name);
    this.setDotForSelectedSort(name);
    let obj = {
      sorts: [{ dir: 'asc', prop: name }],
      column: {}, prevValue: '', newValue: name
    }
    this.sortCallback(obj);
  }

  /**
   * Function : to sort the data in grid.
   */
  sortCallback(sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
    // there will always be one "sort" object if "sortType" is set to "single"
    console.log("into the sort functiona of the coure");
    console.log(sortInfo);
    if (sortInfo.newValue == 'new' || sortInfo.newValue == 'old') {
      let sortBYType = sortInfo.newValue == 'new' ? 'asc' : 'desc';
      this.userSearchForm.controls['sortByType'].setValue(sortBYType);
      this.setPage({ offset: 0 }, this.searchDTO);
    }
    else {
      let sortBYType = sortInfo.sorts[0].dir == 'asc' ? 'ASC' : 'DESC';
      this.userSearchForm.controls['sortByField'].setValue(sortInfo.sorts[0].prop);
      this.userSearchForm.controls['sortByType'].setValue(sortBYType);
      this.setPage({ offset: 0 }, this.searchDTO);
    }
    // Call set page from here.
  }

  setPage(pageinfo, filterData: UserSearchDTO) {
    console.log("ROWS PAR PAGE..");
    console.log(this.rowsOnPage);

    this.page.pageNumber = pageinfo.offset;
    this.api_route.apiroute = 'users/pageNumber/' + (pageinfo.offset + 1) + '/pageSize/' + this.rowsOnPage;
    this.api_route.data = filterData;        
    let country = this.userSearchForm && this.userSearchForm.value.country;
    let city = this.userSearchForm && this.userSearchForm.value.city;
    let status = this.userSearchForm && this.userSearchForm.value.status;
    let signUpDate = this.userSearchForm && this.userSearchForm.value.signUpDate;
    let param = new HttpParams();
    if (country !== null) {
      param = param.append('country', country);
    }
    if (status !== null) {
      param = param.append('status', status.toString());
    }
    if (city !== null) {
      param = param.append('city', city.toString())
    }
    if (signUpDate !== null) {
      let scheduleDatePram = moment(signUpDate).format('YYYY-MM-DD');
      param = param.append('signUpDate', scheduleDatePram.toString())
    }
    if (this.userSearchForm.controls.sortByField && this.userSearchForm.controls.sortByField.value !== null && this.userSearchForm.controls.sortByField.value !== '') {
      param = param.append('sortByField', this.userSearchForm.controls.sortByField.value);
    }
    if (this.userSearchForm.controls.sortByType && this.userSearchForm.controls.sortByType.value !== null && this.userSearchForm.controls.sortByType.value !== '') {
      // let sortAsscending = this.userSearchForm.controls.sortByType.value == 'asc' ? 'ASC' : 'DESC';
      param = param.append('sortByType', this.userSearchForm.controls.sortByType.value);
    }
    if (this.userSearchForm.controls.searchKeyword && this.userSearchForm.controls.searchKeyword.value !== null && this.userSearchForm.controls.searchKeyword.value !== '') {
      param = param.append('searchKeyword', this.userSearchForm.controls.searchKeyword.value);
    }
    // this.spinnerService.show();
    if (param['updates'] && param['updates']) {
      this.apiService.getDataNewPortWithParam(this.api_route, param)
        .then((data: any) => {
          this.data = data;
          this.Userdetail = data.data[0];
          this.getResults(this.page).subscribe(pagedData => {
            this.page = pagedData.page;
            this.rows = pagedData.data;
            // this.spinnerService.show();
          });
        }, (err) => {
          console.log(err)
        });
    }
    else {
      let data = this.apiService.getDataNewPort(this.api_route)
        .then((data: any) => {
          this.data = data;
          console.log("ALL RESULT OF THE USRSS...");
          console.log(data);
          this.Userdetail = data.data[0];
          this.getResults(this.page).subscribe(pagedData => {
            this.page = pagedData.page;
            this.rows = pagedData.data;
            console.log(this.rows);
          });
        }, (err) => {
          console.log(err)
        });
    }
  }
  /**
   * A method that mocks a paged server response
   * @param page The selected page
   * @returns {any} An observable containing the employee data
   */
  public getResults(page: Page): Observable<PagedData<UserIndividual>> {
    return of(this.data).pipe(map(data => this.getPagedData(page)));
  };

  /**
   * Package companyData into a PagedData object based on the selected Page
   * @param page The page data used to get the selected data from companyData
   * @returns {PagedData<CorporateEmployee>} An array of the selected data and page
   */
  private getPagedData(page: Page): PagedData<UserIndividual> {
    const pagedData = new PagedData<UserIndividual>();
    page.size = this.rowsOnPage;
    page.totalElements = this.data.totalCount;
    page.totalPages = this.data.totalPages;
    const dataToIttrate = this.data.data;
    console.log(JSON.stringify(page), dataToIttrate);
    const array = [];
    const times = (this.rowsOnPage > page.totalElements) ? page.totalElements : this.rowsOnPage;

    for (let i = 0; i < times; i++) {
      const jsonObj = dataToIttrate[i];
      if (jsonObj) {
        const employee = new UserIndividual(jsonObj.id,
          jsonObj.firstName,
          jsonObj.email,
          jsonObj.citizenship,
          jsonObj.location,
          jsonObj.signUpDate, jsonObj.status, null);
        array.push(employee);
      }
    }
    
    this.selected.push(array[0]);  
    pagedData.data = array;
    pagedData.page = page;
    return pagedData;
  }

  ngOnInit() {
    this.data = this.httpClient.get<UsersComponent>(`assets/data/crm-contact.json`);
    this.ArticleDivShow = 'EDITPROFILE';
    this.getCountries();
    let currentUser = this.Userdetail ? this.Userdetail.id : 1;
    this.getUserDetail(currentUser);
    this.getLevels();
  }

    /**
   * Function: Clear all the fields of Search Form
   */
  clearAll() {
    this.userSearchForm.reset();
    this.setPage({ offset: 0 }, new UserSearchDTO());
  }
  /**
   * Funciton : Get All Data in DropDown of Country.
   */
  getCountries() {
    this.api_route.apiroute = 'country';
    this.apiService.getDataNewUrl(this.api_route)
      .then((data: any) => {
        this.CountryResponceObj = data.data
      }, (err) => {
        console.log(err)
      })
  }

  getCitiesByCountry(id) {
    console.log("#$%#$%#$%#$%$%$#");
    console.log(id);
    // if (id && id != 'null') {
    //   this.api_route.apiroute = 'city/country/' + id;
    //   this.apiService.getDataNewUrl(this.api_route)
    //     .then((data: any) => {
    //       this.CityResponseObj = data.data;
    //     }, (err) => {
    //       console.log(err);
    //     })
    // } else {
    //   this.CityResponseObj = [];
    // }
  }


  getLevels() {
    this.api_route.apiroute = 'level';
    this.apiService.getDataNewUrl(this.api_route)
      .then((data: any) => {
        console.log("### all leveles ::");
        console.log(data.data);
        this.LevelResponceObj = data.data
      }, (err) => {
        console.log(err)
      })
  }

  getEducationSystemFromCountry(countryId) {
    this.api_route.apiroute = 'educationSystem/' + countryId;
    this.apiService.getDataNewUrl(this.api_route)
      .then((data: any) => {
        console.log("all education");
        console.log(data);
        this.EducationSystemResponseObj = data.data;
        console.log("!@#@!@!#@!#@#@!");
        console.log(this.EducationSystemResponseObj[0]['subjects'])
      }, (err) => {
        console.log(err)
      })
  }

  AddSubject(e) {
    console.log("inot add subject");
    let allSubj = this.EducationSystemResponseObj[0]['subjects'];
    let formEle = this.userSubjectGreadForm.value;
    console.log(formEle);
    let This = this;

    _.forEach(allSubj, function (o) {
      if (o.id == formEle.subjectId) {
        debugger;
        This.subjectGreadArray.push({ subjectName: o.subjectName, subjectId: o.id, grade: formEle.grade });
        This.userSubjectGreadForm.reset();
      }
    });
  }

  getUserDetail(userId) {
    this.api_route.apiroute = 'users/' + userId;
    this.apiService.getDataNewPort(this.api_route)
      .then((data: any) => {
        this.Userdetail = data.data;
        console.log("into the whole users DTO");
        console.log(data.data);
      }, (err) => {
        console.log(err)
      })
  }

  getUserDeviceDetail(userId) {
    console.log("into user desvice ID");
    console.log(userId);
    this.api_route.apiroute = 'user/device/basic/' + userId;
    this.apiService.getDataNewPort(this.api_route)
      .then((data: any) => {
        if (data['status'] == 200) {
          this.UserDeviceDetailObj = data.data[0];
        }
        else {
          this.UserDeviceDetailObj = this.noDeviceDetailObj;
        }
        this.getUserDetail(userId);
      }, (err) => {
        console.log(err)
      })
  }

  ShowArticleDiv(value) {
    console.log(value)
    this.ArticleDivShow = value
  }

  selected = [];
  SelectionType = SelectionType;
  onSelect({ selected }) {
    console.log('Select Event', selected);
    this.getUserDeviceDetail(selected[0].id);
  }


  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  openMyModalData(event) {
    this.data.subscribe(response => {
      this.userName = response[event]['name'];
      this.userID = response[event]['id'];
      this.userProPic = response[event]['image'];
      this.userEmail = response[event]['email'];
      this.userPosition = response[event]['position'];
      this.userOffice = response[event]['office'];
      this.userAge = response[event]['age'];
      this.userContact = response[event]['phone_no'];
      this.userDate = response[event]['date'];
    });
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }


  fetchBasicData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/basic.json');

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  fetchFullScreenData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/fullscreen.json');

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  fetchFilterData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempFilter.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rowsFilter = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }


  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      const rows = JSON.parse(req.response);

      for (const row of rows) {
        row.height = Math.floor(Math.random() * 80) + 50;
      }

      cb(rows);
    };
    req.send();
  }

  getRowHeight(row) {
    return row.height;
  }

  addAchivement() {
    console.log("AD ACHIVEMNT");
    let reqData = this.userAchivementsForm.value;
    parseInt(reqData.year);
    this.api_route.apiroute = 'user/achivement';
    this.api_route.data = reqData;
    console.log(this.api_route.data);
    this.EducationAcivementArray.push(this.userAchivementsForm.value);
    this.apiService.setDataNewPort(this.api_route)
      .then((data: any) => {
        this.Userdetail = data.data;
        console.log("into the whole users DTO");
        console.log(data);
      }, (err) => {
        console.log(err)
      })
  }

  deleteAchivement(achivement) {
    _.remove(this.EducationAcivementArray, function (currentObject) {
      return currentObject.id === achivement.id;
    });
  }

  getUserProfileById(userId) {
    console.log("inot the user profile get..");
    console.log(userId);
    // api/user/
    this.api_route.apiroute = 'user/' + userId;
    this.apiService.getDataNewUrl(this.api_route)
      .then((data: any) => {
        this.Userdetail = data.data;        
        this.WholeUserProfile = data.data;
        let userProfileDTO = data.data;
        this.userPersonalInfoForm.patchValue(userProfileDTO.userDto);
        this.subjectGreadArray = userProfileDTO.educationSystemResponse.educationAOLevelSubjectList;
        this.userEducationQualificationForm.patchValue(userProfileDTO.educationSystemResponse.educationDetail);
        this.EducationAcivementArray = userProfileDTO.userAchivementsList;
      }, (err) => {
        console.log(err)
      })
  }

  saveUserPersonalDetail(userId) {   
    let user = <User>this.userPersonalInfoForm.value;
    user.roles = [{
      "id": 2
    }]
    console.log("this is the user req....");
    console.log(user);
    let reqDto = {
      email: this.userPersonalInfoForm.value.email,
      user: user
    }
    console.log(reqDto);
    this.api_route.apiroute = 'users/' + this.userPersonalInfoForm.value.id;
    this.api_route.data = reqDto;
    this.apiService.putDataNew(this.api_route)
      .then((data: any) => {
        console.log("SUCCESSSSSS....");
        console.log(data.data);
        this.doToggleView('userPersonalInfoForm')
      }, (err) => {
        console.log(err)
      })

  }

  saveUserEducationDetail() {
    let newSubjectArray = [];
    _.forEach(this.subjectGreadArray, function (val, id) {
      if (val.id == undefined) {
        newSubjectArray.push({ subjectId: val.subjectId, grade: val.grade });
      } else {
        newSubjectArray.push({ subjectId: val.id, grade: val.grade });
      }
    })
    let reqDto = {
      educationDetail: {},
      englishScoresList: [],
      educationAOLevelSubjectList: [],
      userId: 0
    };
    reqDto.educationDetail = this.userEducationQualificationForm.value;
    reqDto.englishScoresList = this.WholeUserProfile.educationSystemResponse.englishScoresList;
    reqDto.educationAOLevelSubjectList = newSubjectArray;
    reqDto.userId = this.WholeUserProfile.educationSystemResponse.userId;
    console.log(reqDto);

    this.api_route.apiroute = 'educationSystem/details';
    this.api_route.data = reqDto;
    this.apiService.setDataNewUrl(this.api_route)
      .then((data: any) => {
        this.doToggleView('userEducationQualificationForm')
      }, (err) => {
        console.log(err)
      })
  }

  deleteUserProfile(userId) {
    console.log("into delete..", userId);
    console.log("intot the delete profile function...");
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to Delete Todo ?')
      .then((confirmed) => {
        if (confirmed) {
          this.api_route.apiroute = 'admin/user/deactive/' + userId.id;
          this.apiService.putDataNew(this.api_route).then((res: any) => {
            this.alertService.showMessage(res['message'], 200);
            // alert("its delete..");
            this.setPage({ offset: 0 }, new UserSearchDTO());
            // this.onClickNewTodo();
            // this.getTodoListByUser();
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
        this.alertService.showMessage("Todo Delete Fail", 400);
      });

  }

}
