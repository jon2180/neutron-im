import { AuthGuard } from "@/components/http/auth.guard";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ChatPanelComponent } from "./chats/chat-panel/chat-panel.component";
import { ChatsHomeComponent } from "./chats/chats-home/chats-home.component";
import { ErrorComponent } from "./layout/error/error.component";
import { HomeComponent } from "./layout/home/home.component";
import { LoginComponent } from "./login/login/login.component";

@NgModule({
  imports: [RouterModule.forRoot([
    // 登录页
    {
      path: "login",
      component: LoginComponent
    },
    // 聊天应用页
    {
      path: "",
      canActivate: [AuthGuard],
      component: HomeComponent,
      children: [
        // chats
        {
          path: "chats",
          component: ChatsHomeComponent,
          children: [
            {
              path: ":chatId",
              component: ChatPanelComponent
            }
          ]
        },
        // friends
        {
          path: "friends",
          component: ChatsHomeComponent,
          children: [{
            path: ":friendId",
            component: ChatPanelComponent
          }]
        },

        // collections
        {
          path: "collections",
          component: ChatsHomeComponent,
          children: [{
            path: ":collectionId",
            component: ChatPanelComponent
          }]
        },

        // redirect to chats page
        {
          path: "",
          redirectTo: "chats",
          pathMatch: "prefix"
        }
      ]
    },
    // 错误页
    {
      path: "**",
      component: ErrorComponent,
      data: {
        statusCode: 404
      }
    }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
