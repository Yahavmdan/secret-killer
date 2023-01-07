import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SignInComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule {}
