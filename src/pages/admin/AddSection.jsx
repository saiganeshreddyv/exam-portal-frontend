import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/admin/AddSection.css";

export default function AddSection() {
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    const admin = JSON.parse(localStorage.getItem("admin"));

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/sections`,
      { year, branch, section_code: code },
      { headers: { "x-admin-id": admin.id } }
    );

    navigate("/admin/sections");
  };

  return (
    <div className="add-section">
        <div>
            <h2>Add Section</h2>
            <h1></h1>
        </div>


      <select onChange={e => setYear(e.target.value)}>
        <option value="">Select Year</option>
        {[1,2,3,4].map(y => <option key={y}>{y}</option>)}
      </select>

      <select onChange={e => setBranch(e.target.value)}>
        <option value="">Select Branch</option>
        <option>CSE</option>
        <option>ECE</option>
        <option>IT</option>
      </select>

      <input
        placeholder="Section Code (A)"
        onChange={e => setCode(e.target.value)}
      />

      <button onClick={submit}>Create Section</button>
    </div>
  );
}
