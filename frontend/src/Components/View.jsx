import axios from "axios";
import { useState, useEffect } from "react";
import LogStud from "./LogStud";
import { Navigate, useNavigate } from "react-router-dom";

function View() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("https://o-tosin.onrender.com/");
        setStudents(res.data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this")) {
      try {
        await axios.delete(`https://o-tosin.onrender.com/${id}`);
        setStudents(students.filter((student) => student._id !== id));
      } catch (err) {
        console.error("Error deleting student:", err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  // Match name or email
  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase();
    const deptQuery = selectedDept.toLowerCase();
    const nameMatch = student.name?.toLowerCase().includes(query);
    const emailMatch = student.email?.toLowerCase().includes(query);
    const matchesSearch = !searchQuery || nameMatch || emailMatch;

    // Match Department
    const matchesDept = student.department?.toLowerCase().includes(deptQuery);

    // Match Level
    const matchesLevel =
      !selectedLevel || String(student.level).includes(selectedLevel);

    return matchesSearch && matchesDept && matchesLevel;
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = currentPage - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div>
      <div>
        <h4>ALL STUDENTS</h4>

        <label>Search Student</label>
        <input
          placeholder="Search by name or email..."
          value={searchQuery}
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <label>Filter by Department</label>
        <input
          placeholder="Search depart..."
          value={selectedDept}
          type="text"
          onChange={(e) => setSelectedDept(e.target.value)}
        />

        <label>Filter by level</label>
        <input
          placeholder="Search student L...."
          value={selectedLevel}
          type="number"
          onChange={(e) => setSelectedLevel(e.target.value)}
        />
      </div>

      <br />

      {loading && <p>loading students...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="table-custom-container mt-3">
          <table className="table table-striped table-hover table-bordered shadowed-sm align-middle mt-3">
            <thead className="table-dark">
              <tr>
                <th>Actions</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Department</th>
                <th>Level</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(student._id)}
                      title="Edit"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(student._id)}
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.department}</td>
                  <td>{student.level}</td>
                  <td>{student.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredStudents.length === 0 && <p>No matching students found.</p>}
        </div>
      )}

      <div className="d-flex gap-2 align-items-center">
        <button
          className="btn btn-primary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-primary"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default View;
