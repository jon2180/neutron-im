import { configureStore } from "@reduxjs/toolkit";

import chatHistoryReducer from "@/store/chatsSlice";
import userInfoReducer from "@/store/userInfoSlice";
import friendListSlice from "@/store/friendsSlice";

import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    chats: chatHistoryReducer,
    userInfo: userInfoReducer,
    friends: friendListSlice,
  },
});

// export the `State` type
// visit https://redux-toolkit.js.org/usage/usage-with-typescript#using-configurestore-with-typescript
export type RootState = ReturnType<typeof store.getState>;

// export the `Dispatch` type
// visit https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch;
// Export a hook that can be reused to resolve types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
