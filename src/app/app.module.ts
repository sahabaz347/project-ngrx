import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { YoutubeLayoutComponent } from './components/layout/youtube-layout/youtube-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './core/material.module';
import { UsersComponent } from './containers/users/users.component';
import { PostComponent } from './containers/post/post.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from 'src/app/reducer';
import { AppErrorComponent } from './components/app-error/app-error.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UpdateUserComponent } from './components/layout/update-user/update-user.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    YoutubeLayoutComponent,
    UsersComponent,
    PostComponent,
    UserCardComponent,
    UserListComponent,
    AppErrorComponent,
    UpdateUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
