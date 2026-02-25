import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import toast from "react-hot-toast";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth"


const AuthContext = createContext()
export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    const [loading, setLoading] = useState(true)

    const register = (email, password) => {
        toast.success("Registered successfully!")
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        toast.success("Logged in successfully!")
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        toast.success("Logged out successfully!")
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        register,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}