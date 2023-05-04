import {createContext, useState} from "react";

export const UserContext = createContext();


export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        return user ? user : null;
    });

    const login = (user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }

    return (
        <UserContext.Provider value={{user, login}}>
            {children}
        </UserContext.Provider>
    );
};