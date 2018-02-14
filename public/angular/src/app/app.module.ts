import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
        { path: 'chat', component: ChatComponent },
        { path: '', component: LoginComponent },
      ],
      { enableTracing: true }
    )

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
