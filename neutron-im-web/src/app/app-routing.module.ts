import { AuthGuard } from "@/modules/http/auth.guard";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChatPanelComponent } from "./chats/chat-panel/chat-panel.component";
import { ChatsHomeComponent } from "./chats/chats-home/chats-home.component";
import { ErrorComponent } from "./layout/error/error.component";
import { HomeComponent } from "./layout/home/home.component";
import { LoginComponent } from "./login/login/login.component";
import { RelationsHomeComponent } from "@/app/relations/relations-home/relations-home.component";
import {
  RelationsAccountProfileComponent
} from "@/app/relations/relations-account-profile/relations-account-profile.component";

const routes: Routes = [
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
        component: RelationsHomeComponent,
        children: [{
          path: ":friendId",
          component: RelationsAccountProfileComponent
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
