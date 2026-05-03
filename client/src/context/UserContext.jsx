import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(()=> {
    const storedUser = localStorage.getItem("user");
    return storedUser ? storedUser : null;
  });
  return(
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
        {children}
    </UserContext.Provider>
  )
}

export function useUser(){
    return useContext(UserContext);
}
