import React from 'react'
import { createContext,useContext,useState } from 'react'
const AuthContext = createContext();
export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
        const login = (email) =>{
            setUser({
                name : "Alumini name",
                email : email,
                role : "Alumini",
                verified : true
            })
        }
        const signup = (data) =>{
            setUser({
                ...data,
                role : "Alumini",
                verified : false
            })
        }
        const logout = () =>{
            setUser(null);
        }
    

  return (
    <AuthContext.Provider value={{user, login,signup, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);

