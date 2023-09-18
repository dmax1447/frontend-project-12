import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { actions } from '../slices/channelsSlice.js';

const MainPage = () => {
  const dispatch = useDispatch();
  console.log('actions', actions);
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        const { channels } = r.data;
        dispatch(actions.addChannels(channels));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div>
      Main Page
    </div>
  );
};

export default MainPage;
