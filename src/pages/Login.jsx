import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { LocateIcon } from "lucide-react";

const Login = () => {
    const {login} = useAuth()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [name , setName] = useState("")
    const location = useLocation()
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await login(email,password)
            navigate(location.state?.from || "/")
            alert("Giriş başarılı")
        } catch(err) {
            alert(err.message)
        }
        console.log(location.state)
    }

        return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
        />
        <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
        />

        <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        </form>
    );
};

export default Login;
