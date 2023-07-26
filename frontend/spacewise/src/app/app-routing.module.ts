import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterAndLoginComponent } from './register-and-login/register-and-login.component';
import { BlogpostCreateComponent } from './blogpost-create/blogpost-create.component';
import { BlogpostViewComponent } from './blogpost-view/blogpost-view.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterAndLoginComponent },
  { path: 'login', component: RegisterAndLoginComponent  },
  { path: 'blogpost/create', component: BlogpostCreateComponent  },
  { path: 'blogpost/edit/:id', component: BlogpostCreateComponent  },
  { path: 'blogpost/view/:id', component: BlogpostViewComponent  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
