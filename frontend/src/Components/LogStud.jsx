import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogStud() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");

  const Log = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://o-tosin.onrender.com/login", {
        name,
        email,
        level: Number(level),
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      setName("");
      setEmail("");
      setLevel("");

      navigate("/view");
    } catch (err) {
      console.log("Login failed:", err);
    }
  };

  return (
    <form onSubmit={Log}>
      <div>
        <label>Name</label>
        <input
          placeholder="Enter your name"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          placeholder="Enter your email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Level</label>
        <input
          placeholder="Enter your Level"
          value={level}
          type="text"
          onChange={(e) => setLevel(e.target.value)}
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LogStud;
