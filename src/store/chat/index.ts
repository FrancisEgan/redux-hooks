import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  user: string;
  message: string;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: []
};

export const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<Message>) => {
      state.messages = [...state.messages, action.payload];
    }
    // deleteMessage: (state, action: Action) => {
    //   state.messages =  state.messages.filter(
    //     message => message.timestamp !== action.meta.timestamp
    //   )
    // }
  }
});

export const { sendMessage } = slice.actions;

export default slice.reducer;
