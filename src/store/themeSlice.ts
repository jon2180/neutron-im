import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '@/types/state';
import { MenuTheme } from 'antd';

const initialState = {
  name: 'default',
  menuTheme: 'light' as MenuTheme,
};

/**
 * 聊天记录 slice
 */
export const recentChatsSlice = createSlice({
  name: 'recentChats',
  initialState,
  reducers: {
      changeTheme(state, action) {
    },
  },
  extraReducers(builder) {
  },
});

export function selectMenuTheme(state: RootState) {
  return state.theme.menuTheme;
}

export default recentChatsSlice.reducer;
