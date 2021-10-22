declare namespace Api {
  export interface CurrentUser {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  }

  // type UserInfo = {
  //   avatar: string;
  //   birthday: string;
  //   email: string;
  //   id: number;
  //   nickname: string;
  //   reg_time: string;
  //   signature: string;
  //   status: number;
  //   tel: string;
  //   uid: string;
  // };

  export interface LoginStateType {
    email: string;
    // status?: "ok" | "error";
    // type?: string;
    // userInfo: UserInfoSubstate
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}

export default Api;
