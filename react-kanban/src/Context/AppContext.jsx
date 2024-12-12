import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState({
        "new" : [
        ],
        "approved" : [
        ],
        "done" : [
        ]
    });

    async function getUser() {
        const res = await fetch('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await res.json();
        if(res.ok) {
            setUser(data);
        }
    }

    useEffect(() => {
        if(token) {
            getUser();
        }
    }, [token])

    return(<AppContext.Provider value={{ token, setToken, user, setUser, posts, setPosts }}>
        {children}
    </AppContext.Provider>)
}