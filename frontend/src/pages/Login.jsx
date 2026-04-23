import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);
      window.location = "/dashboard";
    } catch {
      alert("Invalid Login");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />

      <button onClick={handleLogin}>Login</button>

      <p onClick={()=>window.location="/register"}>Go to Register</p>
    </div>
  );
}