import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [streamKey, setStreamKey] = useState("");
  const [streamInfo, setStreamInfo] = useState();
  const getProfile = async () => {
    try {
      const res = await axios.get("/profile");
      setStreamKey(res.data.streamKey);
      setUsername(res.data.username);
    } catch (error) {
      console.log("Not Logged in");
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        streamKey,
        setStreamKey,
        streamInfo,
        setStreamInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
