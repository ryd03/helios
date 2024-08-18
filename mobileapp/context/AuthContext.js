import React, { createContext, useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherDefault, setWeatherDefault] = useState(null);


  useEffect(() => {
    async function checkAuth() {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const signedIn = async (loggedInUser) => {
      setUser(loggedInUser);
  };

  const signedOut = async () => {
      setUser(null);
      setWeatherDefault(null);
  };

  const updateWeather = async (weather) => {
    setWeatherDefault(weather);
};

  return (
    <AuthContext.Provider value={{ user, loading, signedIn, signedOut , updateWeather }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
