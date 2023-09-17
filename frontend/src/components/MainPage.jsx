import { useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        console.log(r.data);
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
