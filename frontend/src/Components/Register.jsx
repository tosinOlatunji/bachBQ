import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const onRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://bachbq.onrender.com/", {
        name,
        email,
        age,
        department,
        level,
        phone,
      });
      setName("");
      setEmail("");
      setAge("");
      setDepartment("");
      setLevel("");
      setPhone("");
      navigate("/");
    } catch (err) {
      console.error(err.message);
      setError(err.response?.data?.message || err.message);
    }
  };

  if (error) return <h2>{error}</h2>;
  return (
    <form onSubmit={onRegister}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="form-container">
        <div className="form-group">
          <label>Name</label>
          <input
            placeholder="Enter your name"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            placeholder="Enter your email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            placeholder="Enter your Age"
            value={age}
            type="number"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            placeholder="Enter your Department"
            value={department}
            type="text"
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Level</label>
          <input
            placeholder="Enter your Level"
            value={level}
            type="text"
            onChange={(e) => setLevel(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            placeholder="Enter your Phone No."
            value={phone}
            type="number"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="form-group">
        Register
      </button>
    </form>
  );
}

export default Register;
