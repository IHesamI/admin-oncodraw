import { createContext, useState, useEffect, ReactNode, useContext, Dispatch, SetStateAction } from 'react';
import BackEndApisServiceInstance from './Api/ServerApis';
import { User } from './types';

interface UserContextType {
  user: User | null;
  loading: boolean;
  verifyUser: () => void;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  loading: false,
  verifyUser() { },
  setUser() { },
});
export const getUserContext = () => useContext(UserContext);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const verifyUser = async () => {
    try {
      const a = await BackEndApisServiceInstance.verifyUser();
      setUser(a.admin);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    if (user)
      setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) {
      try {
        window.$crisp.push(["set", "user:email", [user.email]]);
        window.$crisp.push(["set", "user:nickname", [user.username]]);
      } catch (error) {
        console.warn("Crisp API error:", error);
      }
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loading, verifyUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};