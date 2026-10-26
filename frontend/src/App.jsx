import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import LogStud from "./Components/LogStud";
import UpdateStud from "./Components/UpdateStud";
import View from "./Components/View";
import Settings from "./Components/Settings";

function App() {
  const [newTheme, setNewTheme] = useState("light");

  useEffect(() => {
    document.body.className = newTheme;
  }, [newTheme]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LogStud />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/view" element={<View />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/update/:id" element={<UpdateStud />} />
      </Routes>

      <button
        onClick={() => setNewTheme(newTheme === "light" ? "dark" : "light")}
        style={{ width: "fit-content" }}
      >
        Toggle Theme
      </button>
    </>
  );
}

export default App;
