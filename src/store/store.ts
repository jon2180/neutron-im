import { configureStore } from "@reduxjs/toolkit";
import chatHistoryReducer from "../pages/chat/chatHistorySlice";
import recentListReducer from "../pages/side-bar/recentListSlice";
import userInfoReducer from "../pages/user/userInfoSlice";

export default configureStore({
  // middleware:
  reducer: {
    chatHistory: chatHistoryReducer,
    recentList: recentListReducer,
    userInfo: userInfoReducer,
  },
});
