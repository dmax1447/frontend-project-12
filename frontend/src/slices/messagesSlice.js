import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

// BEGIN (write your solution here)
const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
  },
});

export const { addMessages } = messagesSlice.actions;
export const { selectAll: allMesaages } = messagesAdapter.getSelectors((state) => state.messages);

export const messagesByChannel = createSelector(
  [
    (channelId) => channelId,
  ],
  (channelId) => (state) => Object
    .values(state.messages.entities)
    .filter((message) => message.channelId === channelId),
);
export default messagesSlice.reducer;
