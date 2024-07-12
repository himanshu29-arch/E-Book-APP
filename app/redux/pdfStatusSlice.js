import {createSlice} from '@reduxjs/toolkit';

export const pdfStatusSlice = createSlice({
  name: 'pdfStatus',
  initialState: {},
  reducers: {
    setPdfStatus(state, action) {
      const {id, status} = action.payload;
      state[id] = status;
    },
    setPdfStatuses(state, action) {
      Object.keys(action.payload).forEach(id => {
        state[id] = action.payload[id];
      });
    },
  },
});
export const {setPdfStatuses, setPdfStatus} = pdfStatusSlice.actions;

export default pdfStatusSlice.reducer;
