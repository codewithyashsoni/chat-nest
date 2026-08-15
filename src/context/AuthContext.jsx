import { useState, useEffect, createContext, useContext } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/auth.js"

const AuthContext = createContext();

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, [])

    return(
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}

export default AuthProvider