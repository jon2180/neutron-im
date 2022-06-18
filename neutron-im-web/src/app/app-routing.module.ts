import { AuthGuard } from '@/components/http/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatPanelComponent } from './chats/chat-panel/chat-panel.component';
import { ChatsHomeComponent } from './chats/chats-home/chats-home.component';
import { ErrorComponent } from './layout/error/error.component';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './login/login/login.component';

@NgModule({
  imports: [RouterModule.forRoot([
    // 登录页
    {
      path: 'login',
      component: LoginComponent
    },
    // 聊天应用页
    {
      path: '',
      canActivate: [AuthGuard],
      component: HomeComponent,
      children: [{
        path: 'chats',
        component: ChatsHomeComponent,
        children: [{
          path: ':chatId',
          // outlet: 'chat-panel',
          component: ChatPanelComponent
        }]
      }, {
        path: 'friends',
        component: ChatsHomeComponent,
        children: [{
          path: ':friendId',
          // outlet: 'chat-panel',
          component: ChatPanelComponent
        }]
      }, {
        path: 'collections',
        component: ChatsHomeComponent,
        children: [{
          path: ':collectionId',
          // outlet: 'chat-panel',
          component: ChatPanelComponent
        }]
      }, {
        path: '',
        redirectTo: 'chats',
        pathMatch: 'prefix'
      }]
    },
    // 错误页
    {
      path: '**',
      component: ErrorComponent,
      data: {
        statusCode: 404
      }
    }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
