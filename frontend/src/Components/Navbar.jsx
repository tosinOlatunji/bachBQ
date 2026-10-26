import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 mb-4">
      <span className="navbar-brand fw-bold" style={{ fontSize: "20px" }}>
        🎓Student Management
      </span>
      <div className="navbar-nav ms-auto gap-3">
        <Link className="nav-link py-1" to="/">
          Dashboard
        </Link>
        <Link className="nav-link py-1" to="/reg">
          Register Student
        </Link>
        <Link className="nav-link py-1" to="/view">
          View Students
        </Link>
        <Link className="nav-link py-1" to="/settings">
          Settings
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
