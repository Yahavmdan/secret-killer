import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from "./components/user/login/login.component";
import { SignUpComponent } from "./components/user/sign-up/sign-up.component";
import { SessionComponent } from "./components/session/session.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SessionResolver } from "./resolves/session.resolver";
import { SessionGuard } from "./guards/session.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: SignUpComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'session/:id',
    component: SessionComponent,
    resolve: [SessionResolver],
    canDeactivate: [SessionGuard],
    canActivate: [SessionGuard]
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule {
}
