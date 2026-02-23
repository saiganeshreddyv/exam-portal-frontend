// import StudentNavbar from "./StudentNavbar";

// export default function StudentLayout({ children }) {
//   return (
//     <>
//       <StudentNavbar />

//       {/* Content below navbar */}
//       <div style={{ paddingTop: "64px" }}>
//         {children}
//       </div>
//     </>
//   );
// }
import StudentNavbar from "./StudentNavbar";

export default function StudentLayout({ children }) {
  return (
    <>
      <StudentNavbar />

      {/* Full width content area */}
      <div className="student-layout-content">
        {children}
      </div>
    </>
  );
}

