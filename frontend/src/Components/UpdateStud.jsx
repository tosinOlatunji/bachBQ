import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function updateStud() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    department: "",
    level: "",
    phone: "",
  });

  useEffect(() => {
    const getStudent = async () => {
      try {
        const res = await axios.get(`https://o-tosin.onrender.com/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    getStudent();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://o-tosin.onrender.com/${id}`,
        formData,
      );
      alert("Student updated successfully!");
      navigate("/view");
    } catch (err) {
      console.error("Failed to update student:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Email"
        />
        <input
          type="number"
          name="age"
          value={formData.age || ""}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Age"
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange || ""}
          className="form-control mb-2"
          placeholder="Department"
        />
        <input
          type="number"
          name="level"
          value={formData.level}
          onChange={handleChange || ""}
          className="form-control mb-2"
          placeholder="Level"
        />
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange || ""}
          className="form-control mb-2"
          placeholder="Phone No..."
        />
        <button type="submit" className="btn btn-success">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default updateStud;
