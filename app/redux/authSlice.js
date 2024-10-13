import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {useIcon} from '../assets/icons/useIcon';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    profilePic: '',
  },
  reducers: {
    login(state, action) {
      console.log('🚀 ~ login ~ action:', action.payload);
      state.isLoggedIn = true;
      state.user = action.payload;
      state.profilePic = action.payload.profilePic;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.profilePic = '';
    },
    setProfilePic(state, action) {
      state.profilePic = action.payload;
    },
  },
});
export const {login, logout, setProfilePic} = authSlice.actions;

export default authSlice.reducer;
