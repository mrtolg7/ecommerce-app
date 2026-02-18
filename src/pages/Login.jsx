import { useState } from "react";
import { useAuth } from "../utils/AuthContext";

const Login = () => {
    const {login} = useAuth()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await login(email,password)
            alert("Giriş başarılı")
        } catch(err) {
            alert(err.message)
        }
    }

        return (
        <form onSubmit={handleSubmit}>
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
