import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule }  from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from "./components/structure/footer/footer.component";
import { NavbarComponent } from "./components/structure/navbar/navbar.component";
import { LoginComponent } from "./components/user/login/login.component";
import { SignUpComponent } from "./components/user/sign-up/sign-up.component";
import { SessionComponent } from './components/session/session.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SessionResolver } from "./resolves/session.resolver";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ChatComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    SessionComponent,
    DashboardComponent
  ],

  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    HttpClientModule,
    RouterLink
  ],

  providers: [SessionResolver],

  bootstrap: [
    AppComponent
  ]

})
export class AppModule {
}
