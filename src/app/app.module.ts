import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HttpClientModule } from "@angular/common/http";
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from "./components/home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    ChatComponent,
    HomeComponent
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

  providers: [],

  bootstrap: [
    AppComponent
  ]

})
export class AppModule {
}
