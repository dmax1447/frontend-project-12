import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addChannels } from '../slices/channelsSlice.js';
import { addMessages } from '../slices/messagesSlice.js';
import Channels from './Channels';
import Messages from './Messages';

const MainPage = () => {
  const dispatch = useDispatch();
  const [activeChannelId, setActiveChannelId] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        const { channels, messages } = r.data;
        dispatch(addChannels(channels));
        dispatch(addMessages(messages));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels activeChannelId={activeChannelId} setActiveChannel={setActiveChannelId} />
        <Messages activeChannelId={activeChannelId} />
      </div>

    </div>
  );
};

export default MainPage;
