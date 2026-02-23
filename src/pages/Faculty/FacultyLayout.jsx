// import FacultyNavbar from "./FacultyNavbar";
// import { Outlet } from "react-router-dom";
// import "../../styles/faculty/FacultyLayout.css";

// export default function FacultyLayout() {
//   return (
//     <div className="faculty-layout">
//       <FacultyNavbar />

//       {/* FRAME 2: CONTENT */}
//       <main className="faculty-frame">
//         <Outlet />
//       </main>
//     </div>
//   );
// }
import FacultyNavbar from "./FacultyNavbar";

export default function FacultyLayout({ children }) {
  return (
    <div className="app-frame">
      <FacultyNavbar />
      <div className="app-body">
        {children}
      </div>
    </div>
  );
}

