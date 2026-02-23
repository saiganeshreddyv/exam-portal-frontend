// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function FacultyLogin() {
//   const [regNo, setRegNo] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     try {
//       const res = await axios.post("http://localhost:5000/api/faculty/login", {
//         registration_number: regNo,
//         password,
//       });

//       if (res.data.requireChange) {
//         localStorage.setItem("registration_number", regNo);
//         navigate("/change-password");
//       } else {
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>👩‍🏫 Faculty Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           placeholder="Faculty ID"
//           value={regNo}
//           onChange={(e) => setRegNo(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       <p className="msg">{message}</p>
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FacultyLogin() {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/faculty/login`,
        {
          registration_number: formData.registration_number,
    password: formData.password
        }
      );

      /**
       * EXPECTED BACKEND RESPONSE FORMAT:
       * {
       *   user: { id, name, email, ... },
       *   token?: "jwt-token"
       * }
       */

      const faculty = res.data.user;

      // 🔐 HARD VALIDATION (important)
      if (!faculty || !faculty.id) {
        throw new Error("Invalid faculty login response");
      }

      // ✅ STORE FACULTY (THIS WAS THE CORE BUG EARLIER)
      localStorage.setItem("faculty", JSON.stringify(faculty));

      // OPTIONAL: store token if backend sends it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // CLEAN UP (optional but safe)
      localStorage.removeItem("student");

      // ✅ ALWAYS USE FACULTY ROUTE
      navigate("/faculty/dashboard");

    } catch (err) {
      console.error("Faculty login failed:", err);
      setMessage(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-container">
      <h2>👩‍🏫 Faculty Login</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Faculty ID"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {message && <p className="msg">{message}</p>}
    </div>
  );
}
