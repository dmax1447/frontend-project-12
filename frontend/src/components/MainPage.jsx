import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addChannels } from '../slices/channelsSlice.js';
import { addMessages, messagesByChannel } from '../slices/messagesSlice.js';
import Channels from './Channels';
import Messages from './Messages';

const MainPage = () => {
  const dispatch = useDispatch();
  const [activeChannel, setActiveChannel] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
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
        <Messages activeChannel={activeChannel} messages={channelMessages} />
      </div>

    </div>
  );
};

export default MainPage;
