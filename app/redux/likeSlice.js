import {createSlice} from '@reduxjs/toolkit';

export const likeSlice = createSlice({
  name: 'like',
  initialState: {
    like: false,
    dislike: false,
  },
  reducers: {
    like: (state, action) => {
      state.like = action.payload; // Assuming payload is the liked item
    },
    dislike: (state, action) => {
      state.dislike = action.payload; // Assuming payload is the disliked item
    },
  },
});

export const {like, dislike} = likeSlice.actions;

export const selectLikeDislike = state => state.likeDislike;

export default likeSlice.reducer;
