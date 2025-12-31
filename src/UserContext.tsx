import { createContext, useState, useEffect, ReactNode, useContext, Dispatch, SetStateAction } from 'react';
import BackEndApisServiceInstance from './Api/ServerApis';
import { Case, Course, File, StoreType, User } from './types';

interface UserContextType extends StoreType {

  loading: boolean;
  verifyUser: () => void;
  updateStore:Dispatch<SetStateAction<StoreType>>;
}

export const UserContext = createContext<UserContextType>({
  cases: [],
  courses: [],
  storage: {
    files: [],
    totalStorage: 0
  },
  user: null,
  loading: false,
  verifyUser() { },
  updateStore() { },
});
export const getUserContext = () => useContext(UserContext);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<StoreType>({
    user: null,
    storage: {
      files: [],
      totalStorage: 0, // kB
    },
    cases: [],
    courses: [],
  });
  const [loading, setLoading] = useState(true);
  const verifyUser = async () => {
    try {
      const result = await BackEndApisServiceInstance
        .verifyUser();
      setStore(result);
    } catch (error) {
      // setStore(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    if (store.user)
      setLoading(false);
  }, [store]);

  useEffect(() => {
    if (store.user) {
      try {
        window.$crisp.push(["set", "user:email", [store.user.email]]);
        window.$crisp.push(["set", "user:nickname", [store.user.username]]);
      } catch (error) {
        console.warn("Crisp API error:", error);
      }
    }
  }, [store]);

  const updateStore = <T extends keyof StoreType>(key: keyof StoreType, payload: StoreType[T]) => {
    setStore(state => ({ ...state, [key]: payload }));
  }

  return (
    <UserContext.Provider value={{
      ...store,
      loading,
      verifyUser,
      updateStore:setStore,
    }}>
      {children}
    </UserContext.Provider>
  );
};