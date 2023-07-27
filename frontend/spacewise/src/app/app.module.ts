import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterAndLoginComponent } from './register-and-login/register-and-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BlogpostCreateComponent } from './blogpost-create/blogpost-create.component';
import { BlogpostViewComponent } from './blogpost-view/blogpost-view.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { BlogpostCardComponent } from './blogpost-card/blogpost-card.component';
import { BlogpostListComponent } from './blogpost-list/blogpost-list.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterAndLoginComponent,
    BlogpostCreateComponent,
    BlogpostViewComponent,
    SearchBarComponent,
    BlogpostCardComponent,
    BlogpostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
