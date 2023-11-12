import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { addChannels } from '../slices/channelsSlice.js';
import { addMessages, addMessage, messagesByChannel } from '../slices/messagesSlice.js';
import Channels from './Channels';
import Messages from './Messages';

const token = localStorage.getItem('userToken');
const username = localStorage.getItem('userName');
const socket = io('http://localhost:3000', {
  auth: {
    token,
  },
});
socket.on('newMessage', (message) => {
  console.log('receive message', message);
  addMessages([message]);
});

const MainPage = () => {
  const dispatch = useDispatch();
  const [activeChannel, setActiveChannel] = useState(1);

  const sendMessage = (body) => {
    const message = {
      channelId: activeChannel.id,
      body,
      username,
    };
    console.log('send message', message);
    socket.emit('newMessage', message);
  };

  useEffect(() => {
    console.log('run effect');

    axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        const { channels, messages, currentChannelId } = r.data;
        dispatch(addChannels(channels));
        dispatch(addMessages(messages));
        const storedActiveChannel = channels.find((item) => item.id === currentChannelId);
        setActiveChannel(storedActiveChannel);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [dispatch]);

  const channelMessages = useSelector(messagesByChannel(activeChannel.id));

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels activeChannelId={activeChannel.id} setActiveChannel={setActiveChannel} />
        <Messages
          activeChannel={activeChannel}
          messages={channelMessages}
          sendMessage={sendMessage}
        />
      </div>

    </div>
  );
};

export default MainPage;
