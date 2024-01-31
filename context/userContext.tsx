"use client"

import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({children}: any) {
    const [user, setUser] = useState(null);

    useEffect (() => {
        if (!user) {
            axios.get('http://localhost:8000/profile', { withCredentials: true }).then(({data}) => {
                setUser(data);
            })
        }
    }, [])
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}