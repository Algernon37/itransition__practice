import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Circle } from "react-preloaders";
import inMemoryJWT from "../services/inMemoryJWT";
import config from "../config";
import style from "../app.module.scss";
import showErrorMessage from "../utils/showErrorMessage";

export const AuthClient = axios.create({
  baseURL: `${config.API_URL}/auth`,
  withCredentials: true,
});

export const ResourceClient = axios.create({
  baseURL: config.API_URL,
  withCredentials: true
});

ResourceClient.interceptors.request.use(
  (config) => {
    const accessToken = inMemoryJWT.getToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [data, setData] = useState();

  const makeTable = () => {
    ResourceClient.get("/resource/table")
      .then((res) => {
        setData(res.data);
      })
      .catch(showErrorMessage);
  };

  const handleBlockUser = (userId) => {
    ResourceClient.post(`/auth/block/${userId}`)
      .then(() => {
        console.log('Пользователь заблокирован');
        window.location.href = '/sign-in';
      })
      .catch(error => {
        console.error(error);
      });
  };


  const handleUnblockUser = (userId) => {
    ResourceClient.post(`/auth/unblock/${userId}`)
      .then(() => {
        console.log('Пользователь разблокирован');
        makeTable();
      })
      .catch(error => {
        console.error(error);
      });
  };


  const handleDeleteUser = (userId) => {
    ResourceClient.post(`/auth/delete/${userId}`)
      .then(() => {
        console.log('Пользователь удален');
        handleLogOut();
        window.location.href = '/sign-up';
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleLogOut = () => {
    AuthClient.post("/logout")
      .then(() => {
        setIsUserLogged(false);
        inMemoryJWT.deleteToken();
        setData();
      })
      .catch(showErrorMessage);
  };

  const handleSignUp = (data) => {
    AuthClient.post("/sign-up", data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;

        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true);
      })
      .catch(showErrorMessage);
  };

  const handleSignIn = (data) => {
    AuthClient.post("/sign-in", data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;

        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true);
      })
      .catch(showErrorMessage);
  };

  useEffect(() => {
    AuthClient.post("/refresh")
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);

        setIsAppReady(true);
        setIsUserLogged(true);
      })
      .catch(() => {
        setIsAppReady(true);
        setIsUserLogged(false);
      });
  }, []);

  useEffect(() => {
    const handlePersistedLogOut = (event) => {
      if (event.key === config.LOGOUT_STORAGE_KEY) {
        inMemoryJWT.deleteToken();
        setIsUserLogged(false);
      }
    };

    window.addEventListener("storage", handlePersistedLogOut);

    return () => {
      window.removeEventListener("storage", handlePersistedLogOut);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        data,
        makeTable,
        handleSignUp,
        handleSignIn,
        handleLogOut,
        handleBlockUser,
        handleUnblockUser,
        handleDeleteUser,
        isAppReady,
        isUserLogged,
      }}
    >
      {isAppReady ? (
        children
      ) : (
        <div className={style.centered}>
          <Circle />
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;



