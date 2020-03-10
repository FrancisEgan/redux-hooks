import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from './store';
import { Message } from './store/chat/types';
import { updateSession } from './store/system/actions';
import { sendMessage } from './store/chat/actions';
import { thunkSendMessage } from './thunks';
import ChatHistory from './ChatHistory';
import ChatInterface from './ChatInterface';
import './main.css';

export type UpdateMessageParam = React.SyntheticEvent<{ value: string }>;

const App: React.FC = () => {
  const [message, setMessage] = useState('');
  const userName = useSelector<AppState, string>(
    state => state.system.userName
  );
  const messages = useSelector<AppState, Message[]>(
    state => state.chat.messages
  );
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateSession({
        loggedIn: true,
        session: 'my_session',
        userName: 'myName'
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      sendMessage({
        user: 'Chat Bot',
        message:
          'This is a very basic chat application written in typescript using react and redux. Feel free to explore the source code.',
        timestamp: new Date().getTime()
      })
    );
  }, [dispatch]);

  useEffect(() => {
    console.log('test');
    thunkSendMessage('This message was sent by a thunk!');
  }, []);

  const dispatchMessage = (message: string) => {
    dispatch(
      sendMessage({
        user: userName,
        message: message,
        timestamp: new Date().getTime()
      })
    );
    setMessage('');
  };

  return (
    <div className="parent">
      <ChatHistory messages={messages} />
      <ChatInterface
        userName={userName}
        message={message}
        updateMessage={(event: UpdateMessageParam) => {
          setMessage(event.currentTarget.value);
        }}
        sendMessage={dispatchMessage}
      />
    </div>
  );
};

// const mapStateToProps = (state: AppState) => ({
//   system: state.system,
//   chat: state.chat
// });

// export default connect(mapStateToProps, {
//   sendMessage,
//   updateSession,
//   thunkSendMessage
// })(App);

export default App;
