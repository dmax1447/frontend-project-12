import React, { useState, useMemo } from 'react';
import '../assets/styles/application.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import MainPage from './MainPage';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import AuthContext from '../contexts/index.jsx';
// import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  const authContextValue = useMemo(() => ({
    loggedIn, logIn, logOut,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
// const PrivateRoute = ({ children }) => {
//   const auth = useAuth();
//   const location = useLocation();
//
//   return (
//     auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
//   );
// };

const App = () => (
  <AuthProvider>
    <Router>
      <main className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">Hexlet CHAT</a>
          </div>
        </nav>
        <div className="container-fluid h-100">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

        </div>

      </main>

    </Router>
  </AuthProvider>
);

export default App;
