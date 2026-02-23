// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../../styles/admin/SectionDetails.css";
// import StudentModal from "./StudentModal.jsx";

// export default function SectionDetails() {
//   const { sectionId } = useParams();
//   const admin = JSON.parse(localStorage.getItem("admin"));

//   const [section, setSection] = useState(null);
//   const [students, setStudents] = useState([]);

//   const [showStudentModal, setShowStudentModal] = useState(false);
//   const [editStudent, setEditStudent] = useState(null);

//   const [selectedStudentIds, setSelectedStudentIds] = useState([]);

//   const [showCsvModal, setShowCsvModal] = useState(false);
//   const [csvFile, setCsvFile] = useState(null);

//   /* ================= FETCH ================= */
//   useEffect(() => {
//     fetchSection();
//     fetchStudents();
//   }, [sectionId]);

//   const fetchSection = async () => {
//     const res = await axios.get(
//       `http://localhost:5000/api/admin/sections/${sectionId}`,
//       { headers: { "x-admin-id": admin.id } }
//     );
//     setSection(res.data);
//   };

//   const fetchStudents = async () => {
//     const res = await axios.get(
//       `http://localhost:5000/api/admin/sections/${sectionId}/students`,
//       { headers: { "x-admin-id": admin.id } }
//     );
//     setStudents(res.data);
//   };

//   /* ================= ADD / EDIT ================= */
//   const handleStudentSubmit = async (data) => {
//     try {
//       if (editStudent) {
//         await axios.put(
//           `http://localhost:5000/api/admin/students/${editStudent.id}`,
//           data,
//           { headers: { "x-admin-id": admin.id } }
//         );
//       } else {
//         await axios.post(
//           `http://localhost:5000/api/admin/sections/${sectionId}/students`,
//           data,
//           { headers: { "x-admin-id": admin.id } }
//         );
//       }

//       setShowStudentModal(false);
//       setEditStudent(null);
//       fetchStudents();
//     } catch {
//       alert("Failed to save student");
//     }
//   };

//   /* ================= DELETE ================= */
//   const handleDeleteStudents = async () => {
//     if (!window.confirm(`Delete ${selectedStudentIds.length} students?`)) return;

//     try {
//       await axios.post(
//         "http://localhost:5000/api/admin/students/delete",
//         { studentIds: selectedStudentIds },
//         { headers: { "x-admin-id": admin.id } }
//       );

//       setSelectedStudentIds([]);
//       fetchStudents();
//     } catch {
//       alert("Failed to delete students");
//     }
//   };

//   /* ================= CSV UPLOAD ================= */
//   const handleCsvUpload = async () => {
//     if (!csvFile) return;

//     const formData = new FormData();
//     formData.append("file", csvFile);

//     try {
//       await axios.post(
//         `http://localhost:5000/api/admin/sections/${sectionId}/students/upload`,
//         formData,
//         {
//           headers: {
//             "x-admin-id": admin.id,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setShowCsvModal(false);
//       setCsvFile(null);
//       fetchStudents();
//     } catch {
//       alert("CSV upload failed");
//     }
//   };

//   /* ================= CHECKBOX ================= */
//   const toggleSelect = (id) => {
//     setSelectedStudentIds((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//     );
//   };

//   if (!section) return <div className="section-page">Loading...</div>;

//   return (
//     <div className="section-page">

//       {/* ===== HEADER ===== */}
//       <div className="section-header">
//         <h2>
//           {section.year} Year – {section.branch} – Section {section.section_code}
//         </h2>
//         <p>
//           Faculty:{" "}
//           <span className="faculty-name">
//             {section.faculty_name || "Unassigned"}
//           </span>
//         </p>
//       </div>

//       {/* ===== ACTIONS ===== */}
//       <div className="section-actions">
//         <button
//           className="primary"
//           onClick={() => {
//             setEditStudent(null);
//             setShowStudentModal(true);
//           }}
//         >
//           + Add Student
//         </button>

//         <button
//           className="secondary"
//           onClick={() => setShowCsvModal(true)}
//         >
//           Upload CSV
//         </button>

//         <button
//           className="danger"
//           disabled={selectedStudentIds.length === 0}
//           onClick={handleDeleteStudents}
//         >
//           Delete
//         </button>
//       </div>

//       {/* ===== TABLE ===== */}
//       <div className="students-table-wrapper">
//         <table className="students-table">
//           <thead>
//             <tr>
//               <th></th>
//               <th>Roll No</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {students.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="empty">
//                   No students added yet
//                 </td>
//               </tr>
//             ) : (
//               students.map((stu) => (
//                 <tr key={stu.id}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={selectedStudentIds.includes(stu.id)}
//                       onChange={() => toggleSelect(stu.id)}
//                     />
//                   </td>
//                   <td>{stu.roll_number}</td>
//                   <td>{stu.name}</td>
//                   <td>{stu.email}</td>
//                   <td>{stu.phone || "-"}</td>
//                   <td>
//                     <button
//                       className="link"
//                       onClick={() => {
//                         setEditStudent(stu);
//                         setShowStudentModal(true);
//                       }}
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ===== STUDENT MODAL ===== */}
//       <StudentModal
//         open={showStudentModal}
//         initialData={editStudent}
//         onClose={() => {
//           setShowStudentModal(false);
//           setEditStudent(null);
//         }}
//         onSubmit={handleStudentSubmit}
//       />

//       {/* ===== CSV MODAL ===== */}
//       {showCsvModal && (
//         <div className="modal-backdrop">
//           <div className="modal-card">
//             <h3>Upload Students (CSV)</h3>

//             <input
//               type="file"
//               accept=".csv"
//               onChange={(e) => setCsvFile(e.target.files[0])}
//             />

//             <p className="hint">
//               Columns: roll_number, name, email, phone
//               <br />
//               Password = roll number (default)
//             </p>

//             <div className="modal-actions">
//               <button
//                 className="secondary"
//                 onClick={() => {
//                   setShowCsvModal(false);
//                   setCsvFile(null);
//                 }}
//               >
//                 Cancel
//               </button>

//               <button
//                 className="primary"
//                 disabled={!csvFile}
//                 onClick={handleCsvUpload}
//               >
//                 Upload
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/admin/SectionDetails.css";
import StudentModal from "./StudentModal.jsx";
import AssignFacultyModal from "./AssignFacultyModal.jsx";  

export default function SectionDetails() {
  const { sectionId } = useParams();
  const admin = JSON.parse(localStorage.getItem("admin"));

  const [section, setSection] = useState(null);
  const [students, setStudents] = useState([]);

  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  const [showCsvModal, setShowCsvModal] = useState(false);
  const [csvFile, setCsvFile] = useState(null);

  const [showAssignFaculty, setShowAssignFaculty] = useState(false);


  /* ================= GUARD ================= */
  if (!admin?.id) {
    return <div className="section-page">Admin not authenticated</div>;
  }

  /* ================= FETCH ================= */
  const fetchSection = useCallback(async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/admin/sections/${sectionId}`,
      { headers: { "x-admin-id": admin.id } }
    );
    console.log("FETCHED SECTION:", res.data);
    setSection(res.data.section); // ✅ ONLY SECTION
  } catch (err) {
    console.error("FETCH SECTION FAILED:", err);
  }
}, [sectionId, admin.id]);


  const fetchStudents = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/sections/${sectionId}/students`,
        { headers: { "x-admin-id": admin.id } }
      );
      setStudents(res.data);
    } catch (err) {
      console.error("Fetch students failed", err);
    }
  }, [sectionId, admin.id]);

  useEffect(() => {
    fetchSection();
    fetchStudents();
  }, [fetchSection, fetchStudents]);

  /* ================= ADD / EDIT ================= */
  const handleStudentSubmit = async (data) => {
    try {
      if (editStudent) {
        await axios.put(
          `http://localhost:5000/api/admin/students/${editStudent.id}`,
          data,
          { headers: { "x-admin-id": admin.id } }
        );
      } else {
        await axios.post(
          `http://localhost:5000/api/admin/sections/${sectionId}/students`,
          data,
          { headers: { "x-admin-id": admin.id } }
        );
      }

      setShowStudentModal(false);
      setEditStudent(null);
      fetchStudents();
    } catch (err) {
      console.error("Save student failed", err);
      alert("Failed to save student");
    }
  };

  /* ================= DELETE ================= */
  const handleDeleteStudents = async () => {
    if (selectedStudentIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedStudentIds.length} students?`)) return;

    try {
      await axios.post(
        "http://localhost:5000/api/admin/students/delete",
        { studentIds: selectedStudentIds },
        { headers: { "x-admin-id": admin.id } }
      );

      setSelectedStudentIds([]);
      fetchStudents();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete students");
    }
  };

const handleCsvUpload = async () => {
  if (!csvFile) return;

  try {
    const formData = new FormData();
    formData.append("file", csvFile);

    console.log("Uploading CSV...");

    await axios.post(
      `http://localhost:5000/api/admin/sections/${sectionId}/students/upload`,
      formData,
      {
        headers: {
          "x-admin-id": admin.id
        }
      }
    );

    // ✅ IMPORTANT ORDER
    setCsvFile(null);
    setShowCsvModal(false);
    await fetchStudents();   // 👈 WAIT for reload

    alert("CSV uploaded successfully");
  } catch (err) {
    console.error("CSV upload failed", err);
    alert("CSV processing failed");
  }
};



  /* ================= CHECKBOX ================= */
  const toggleSelect = (id) => {
    setSelectedStudentIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };
  const getYearLabel = (year) => {
  switch (Number(year)) {
    case 1:
      return "1st Year";
    case 2:
      return "2nd Year";
    case 3:
      return "3rd Year";
    case 4:
      return "4th Year";
    default:
      return `${year} Year`;
  }
};


  if (!section) return <div className="section-page">Loading...</div>;

  return (
  <div className="section-page">

    {/* ===== HEADER ===== */}
    <div className="section-header">
      <div>
        <h2>
  {section.year} Year – {section.branch} – Section {section.section_code}
</h2>

<p>
  Faculty:{" "}
  <span className="faculty-name">
    {section.faculty_name || "Unassigned"}
  </span>
          <button
            className="link"
            style={{ marginLeft: "12px" }}
            onClick={() => setShowAssignFaculty(true)}
          >
            {section.faculty_name ? "Change" : "Assign Faculty"}
          </button>
        </p>
      </div>
    </div>

    {/* ===== ACTIONS ===== */}
    <div className="section-actions">
      <button
        className="primary"
        onClick={() => {
          setEditStudent(null);
          setShowStudentModal(true);
        }}
      >
        + Add Student
      </button>

      <button
        className="secondary"
        onClick={() => setShowCsvModal(true)}
      >
        Upload CSV
      </button>

      <button
        className="danger"
        disabled={selectedStudentIds.length === 0}
        onClick={handleDeleteStudents}
      >
        Delete
      </button>
    </div>

    {/* ===== TABLE ===== */}
    <div className="students-table-wrapper">
      <table className="students-table">
        <thead>
          <tr>
            <th></th>
            <th>Roll No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty">
                No students added yet
              </td>
            </tr>
          ) : (
            students.map((stu) => (
              <tr key={stu.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedStudentIds.includes(stu.id)}
                    onChange={() => toggleSelect(stu.id)}
                  />
                </td>
                <td>{stu.roll_number}</td>
                <td>{stu.name}</td>
                <td>{stu.email}</td>
                <td>{stu.phone || "-"}</td>
                <td>
                  <button
                    className="link"
                    onClick={() => {
                      setEditStudent(stu);
                      setShowStudentModal(true);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/* ===== STUDENT MODAL ===== */}
    <StudentModal
      open={showStudentModal}
      initialData={editStudent}
      onClose={() => {
        setShowStudentModal(false);
        setEditStudent(null);
      }}
      onSubmit={handleStudentSubmit}
    />

    {/* ===== CSV MODAL ===== */}
    {showCsvModal && (
      <div className="modal-backdrop">
        <div className="modal-card">
          <h3>Upload Students (CSV)</h3>

          <input
            type="file"
            accept=".csv"
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              setCsvFile(file || null);
            }}
          />

          <p className="hint">
            Columns: roll_number, name, email, phone
            <br />
            Password = roll number (default)
          </p>

          <div className="modal-actions">
            <button
              className="secondary"
              onClick={() => {
                setShowCsvModal(false);
                setCsvFile(null);
              }}
            >
              Cancel
            </button>

            <button
              className="primary"
              disabled={!csvFile}
              onClick={handleCsvUpload}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    )}

    {/* ===== ASSIGN FACULTY MODAL ===== */}
    <AssignFacultyModal
      open={showAssignFaculty}
      sectionId={sectionId}
      onClose={() => setShowAssignFaculty(false)}
      onAssigned={fetchSection}
    />

  </div>
);

}
