import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [streamKey, setStreamKey] = useState("");

  useEffect(() => {
    axios
      .get("/profile")
      .then((result) => {
        setStreamKey(result.data.streamKey);
        setUsername(result.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <UserContext.Provider
      value={{ username, setUsername, streamKey, setStreamKey }}
    >
      {children}
    </UserContext.Provider>
  );
}
