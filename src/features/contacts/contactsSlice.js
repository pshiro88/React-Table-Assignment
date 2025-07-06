import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { addContact } = contactsSlice.actions;
export default contactsSlice.reducer;
