import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@/components/http/http.module';
import { HTTP_BASE_URL_TOKEN } from '@/components/http/http.token';
import { environment } from '@/environments/environment';

import { I18N_CONFIG, USING_ZORRO_MODULES } from './zorro-support.model';
import { I18nModule } from "@/components/i18n";

import { CaptchaComponent } from './login/captcha/captcha.component';
import { LoginComponent } from './login/login/login.component';

import { ListPanelComponent } from './chats/list-panel/list-panel.component';
import { ChatPanelComponent } from './chats/chat-panel/chat-panel.component';
import { ChatsHomeComponent } from './chats/chats-home/chats-home.component';

import { MyAvatarComponent } from './layout/my-avatar/my-avatar.component';
import { NavComponent } from './layout/nav/nav.component';
import { HomeComponent } from './layout/home/home.component';
import { ErrorComponent } from './layout/error/error.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    // Home
    AppComponent,

    // Chats
    ListPanelComponent,
    ChatPanelComponent,
    ChatsHomeComponent,

    // Layout
    MyAvatarComponent,
    NavComponent,
    HomeComponent,
    ErrorComponent,

    // Login
    LoginComponent,
    CaptchaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,

    CommonModule,
    I18nModule,

    ReactiveFormsModule,
    ...USING_ZORRO_MODULES,
    StoreModule.forRoot({}, {}),

  ],
  providers: [
    I18N_CONFIG,
    {
      provide: HTTP_BASE_URL_TOKEN, useValue: environment.network.baseApiUrl
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
