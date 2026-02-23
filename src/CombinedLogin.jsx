import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CombinedLogin.css";

export default function CombinedLogin() {
  const [role, setRole] = useState("student");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleToggle = (type) => {
    setRole(type);
    setMessage("");
    setId("");
    setPassword("");
  };

//   const handleLogin = async (e) => {
//   e.preventDefault();
//   setMessage("Loading...");

//   try {
//     const url =
//       role === "student"
//         ? "http://localhost:5000/api/students/login"
//         : "http://localhost:5000/api/faculty/login";

//     const res = await axios.post(url, {
//       registration_number: id.trim(),
//       password: password.trim(),
//     });

//     console.log("✅ Login success:", res.data);

//     const { user, token, requireChange } = res.data;

//     // 🔒 FORCE PASSWORD CHANGE
//     if (requireChange) {
//       localStorage.setItem(
//   "role",
//   user?.role?.toLowerCase() || role
// );

//       localStorage.setItem("registration_number", id.trim());
//       navigate("/change-password");
//       return;
//     }

//     // 🔁 CLEAR OLD SESSION
//     localStorage.clear();

//     // 🔐 STORE SESSION
//    // 🔐 STORE SESSION
// localStorage.setItem("token", token);
// localStorage.setItem(
//   "role",
//   user?.role?.toLowerCase() || role
// );
// localStorage.setItem("user", JSON.stringify(user));


//     // ✅ REDIRECT CORRECTLY
//     navigate(
//       role === "student"
//         ? "/student/dashboard"
//         : "/faculty/dashboard"
//     );

//   } catch (err) {
//     console.error("❌ Login error:", err);
//     setMessage(err.response?.data?.message || "Login failed");
//   }
// };

const handleLogin = async (e) => {
  e.preventDefault();
  setMessage("Loading...");

  // ✅ CLEAR FIRST
  localStorage.clear();

  try {
    const url =
      role === "student"
        ? "http://localhost:5000/api/student/login"
        : "http://localhost:5000/api/faculty/login";

    const res = await axios.post(url, {
      registration_number: id.trim(),
      password: password.trim(),
    });

    console.log("✅ Login success:", res.data);

    const { user, token, requireChange } = res.data;

    // 🔒 FORCE PASSWORD CHANGE (UNCHANGED)
    if (requireChange) {
      localStorage.setItem("role", role);
      localStorage.setItem("registration_number", id.trim());
      navigate("/change-password");
      return;
    }

    // ✅ STORE EXACTLY LIKE OLD WORKING VERSION
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user));

    if (token) {
      localStorage.setItem("token", token);
    }

    navigate(
      role === "student"
        ? "/student/dashboard"
        : "/faculty/dashboard"
    );

  } catch (err) {
    console.error("❌ Login error:", err);
    setMessage(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="combined-login-container">
      <div className="login-card">
        <div className="toggle-buttons">
          <button
            className={role === "student" ? "active" : ""}
            onClick={() => handleToggle("student")}
          >
            🎓 Student
          </button>
          <button
            className={role === "faculty" ? "active" : ""}
            onClick={() => handleToggle("faculty")}
          >
            👨‍🏫 Faculty
          </button>
        </div>

        <div className="login-form">
          <h2>{role === "student" ? "Student Login" : "Faculty Login"}</h2>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder={
                role === "student"
                  ? "Registration Number"
                  : "Faculty ID"
              }
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">
              {role === "student"
                ? "Login as Student"
                : "Login as Faculty"}
            </button>
          </form>

          <p className="message">{message}</p>
        </div>
      </div>
    </div>
  );
}
