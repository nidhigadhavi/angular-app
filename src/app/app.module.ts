import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MenuItems} from './shared/menu-items/menu-items';
import {BreadcrumbsComponent} from './layout/admin/breadcrumbs/breadcrumbs.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/_guards/auth.interceptor';
import { ApiServicesProvider } from './providers/api-services/api-services';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import {NgxPaginationModule} from 'ngx-pagination';
import { AlertComponent } from './shared/alert-dialog/alert.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MyAccessGuard } from '../_guards/urlAccessGuid';
import { AuthGuardService } from '../_guards/auth-guard.service';
// import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent,
    AlertComponent,
    
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng4LoadingSpinnerModule
  ],
  providers: [MenuItems,
     AuthGuardService,
     {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ApiServicesProvider,
    // MyAccessGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
