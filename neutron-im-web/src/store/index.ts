import { configureStore } from '@reduxjs/toolkit';

import chatHistoriesReducer from '@/store/chatsHistoriesSlice';
import userInfoReducer from '@/store/userInfoSlice';
import friendsReducer from '@/store/friendsSlice';
import recentChatsReducer from '@/store/recentChatsSlice';
import { useDispatch } from 'react-redux';
import notificationsSlice from './notificationsSlice';
import themeSlice from './themeSlice';

const store = configureStore({
  reducer: {
    chatHistories: chatHistoriesReducer,
    recentChats: recentChatsReducer,
    userInfo: userInfoReducer,
    friends: friendsReducer,
    notifications: notificationsSlice,
    theme: themeSlice,
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
