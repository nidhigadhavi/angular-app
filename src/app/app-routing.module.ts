import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { MenuItems } from './shared/menu-items/menu-items';
import { AuthGuardService } from '../_guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './home-dashboard/home-dashboard.module#HomeDashboardModule',
        canActivate: [AuthGuardService] 
      },
      
      {
        path: 'notFound',
        loadChildren: './not-found/not-found.module#NotFoundModule'
      },
      {
        path: 'Course',
        loadChildren: './course/course.module#CourseModule',
        canActivate: [AuthGuardService],
        data : {some_data : 'some value'}
      },
      {
        path: 'Scholarship',
        loadChildren: './scholarship/scholarship.module#ScholarshipModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'Companies',
        // loadChildren: './companies/companies.module#CompaniesModule',
        loadChildren: './comming-soon/comming-soon.module#CommingSoonModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'Institution',
        loadChildren: './institution/institution.module#InstitutionModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'Education_Agent',
        // loadChildren: './education-agents/education-agents.module#EducationAgentsModule',
        loadChildren: './comming-soon/comming-soon.module#CommingSoonModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'Push',
        loadChildren: './push/push.module#PushModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'InApp',
        // loadChildren: './inapp/inapp.module#InappModule',
        loadChildren: './comming-soon/comming-soon.module#CommingSoonModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'Users',
        loadChildren: './users/users.module#UsersModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'Applications',
        loadChildren: './applications/applications.module#ApplicationsModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'Email',
        // loadChildren: './email/email.module#EmailModule',
        loadChildren: './comming-soon/comming-soon.module#CommingSoonModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'Reviews',
        loadChildren: './review/review.module#ReviewModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'Chats',
        loadChildren: './chats/chats.module#ChatsModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'Help',
        loadChildren: './help-faqs/help-faqs.module#HelpFaqsModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'All-Users',
        loadChildren: './all-users/all-users.module#AllUsersModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'User-Setting',
        loadChildren: './user-setting/user-setting.module#UserSettingModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'Todo',
        loadChildren: './todo/todo.module#TodoModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'error_reporting',
        loadChildren: './error-reporting/error-reporting.module#ErrorReportingModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'article',
        loadChildren: './post-article/post-article.module#PostArticleModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'Maintenance',
        // loadChildren: './maintenance/maintenance.module#MaintenanceModule',
        loadChildren: './comming-soon/comming-soon.module#CommingSoonModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'Faq',
        // loadChildren: './faq/faq.module#FaqModule',
        loadChildren: './comming-soon/comming-soon.module#CommingSoonModule',
        canActivate: [AuthGuardService],
      },
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadChildren: './auth/auth.module#AuthModule'
      },
    ]
  },
  { path: '**', redirectTo: 'notFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
     
  constructor(public menuItems: MenuItems) {
      // this.allRolePermission = menuItems.getAll();
      // console.log("al permssion in routing module..");
      // console.log(this.allRolePermission);
  }

}
