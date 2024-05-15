import { BrowserRouter } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import AppRoutes from "../AppRoutes/AppRoutes";
import useLocalStorage from "@/hooks/useLocalStorage";
import CurrUserContext from "../CurrUserContext/CurrUserContext";
import { JoblyApi } from "@/api";
import { useState, useEffect } from "react";
import { User } from "@/types";
import { jwtDecode } from "jwt-decode";

type LoginParams = { username: string; password: string };
type SignupParams = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};
type UserProfileData = Partial<{
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  email: string | null;
}>;
type decodedToken = {iat: number, username:string, isAdmin:string};

function App() {

  // retrieves token, setToken from local storage
  const [token, setToken] = useLocalStorage<string | null>('jobly_token', null);
  const [user, setUser] = useState<User | null>(null);
  // need this to ensure the routes only load after the user has been fetched
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // whenever token changes, try to get the current user
    async function tryToGetUser(token: string) {
      try {
        const decodedToken = jwtDecode<decodedToken>(token);
        const foundUser = await JoblyApi.getUser(decodedToken.username);
        setUser(foundUser);
      } catch (err) {
        console.error(`problem getting user: ${err}`);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    JoblyApi.token = token;
    if (token) {
      tryToGetUser(token);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  // logout function, passed down through CurrUserContext
  const logout = () => {
    JoblyApi.logout();
    setToken(null);
  }

  // login function, passed down through CurrUserContext
  const login = async ({ username, password }: LoginParams) => {
    try {
      const newToken = await JoblyApi.login({username, password});
      setToken(newToken);
    } catch (err) {
      alert("Incorrect login or user not found");
      throw err;
    }
  }

  // signup function, passed down through CurrUserContext
  const signup = async ({username, firstName, lastName, password, email}: SignupParams) => {
    try {
      const newToken = await JoblyApi.signup({username, firstName, lastName, password, email});
      setToken(newToken);
    } catch (err) {
      console.error(`Problem signing up in app: ${err}`);
      alert("Error signing up");
      throw err;
    }
  }

  // editProfile function, passed down through CurrUserContext
  const editProfile = async ({...userData}: UserProfileData) => {
    if (user) {
      try {
        const newUser = await JoblyApi.updateUser(user.username, userData);
        setUser(newUser);
      } catch (err) {
        console.error(`Problem updating user in app: ${err}`);
        throw err;
      }
    } else {
      throw new Error(`Request to patch user, but user is null!?`);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      < BrowserRouter >
        <CurrUserContext.Provider value={{user, logout, login, signup, editProfile}}>
          < NavBar />
          < AppRoutes />
        </CurrUserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
