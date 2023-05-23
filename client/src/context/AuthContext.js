import React, { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage('auth', false);
  // const [auth, setAuth] = useState({});
  // console.log(auth)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;