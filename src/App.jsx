// // import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// // import CombinedLogin from "./CombinedLogin";

// // // Faculty Pages
// // import FacultyNavbar from "./pages/Faculty/FacultyNavbar";
// // import FacultyDashboard from "./pages/Faculty/FacultyDashboard";
// // import CreateExam from "./pages/Faculty/CreateExam";
// // import ExamList from "./pages/Faculty/ExamList";
// // import AddQuestions from "./pages/Faculty/AddQuestions";

// // // Student Pages
// // import StudentNavbar from "./pages/student/StudentNavbar";
// // import StudentDashboard from "./pages/student/Dashboard";
// // import StudentExams from "./pages/student/Exams";
// // import StudentResults from "./pages/student/Results";
// // import StudentProfile from "./pages/student/Profile";

// // // Shared
// // import ChangePassword from "./pages/ChangePassword";
// // import FacultyLayout from "./pages/Faculty/FacultyLayout";
// // import QuestionsList from "./pages/Faculty/QuestionsList";

// // // function Layout({ children }) {
// // //   const location = useLocation();
// // //   const path = location.pathname;

// // //   const isFaculty = path.startsWith("/faculty");
// // //   const isStudent = path.startsWith("/student");
// // //   const isLogin = path === "/";

// // //   return (
// // //     <>
// // //       {!isLogin && (
// // //         <>
// // //           {isFaculty && <FacultyLayout />}
// // //           {isStudent && <StudentLayout />}
// // //         </>
// // //       )}
// // //       {children}
// // //     </>
// // //   );
// // // }
// // function Layout({ children }) {
// //   const location = useLocation();
// //   const path = location.pathname;

// //   const isFaculty = path.startsWith("/faculty");
// //   const isStudent = path.startsWith("/student");
// //   const isLogin = path === "/";

// //   return (
// //     <>
// //       {/* FRAME 1: NAVBAR */}
// //       {!isLogin && isFaculty && <FacultyLayout />}
// //       {!isLogin && isStudent && <StudentLayout />}

// //       {/* FRAME 2: CONTENT */}
// //       {/* <div className={!isLogin ? "page-container" : ""}>
// //         {children}
// //       </div> */}
// //       <main className={!isLogin ? "app-content" : ""}>
// //         {children}
// //       </main>
// //     </>
// //   );
// // }

// // export default function App() {
// //   return (
// //     <>
// //       <Layout>
// //         <div className="page-container">
// //           <Routes>
// //             <Route path="/" element={<CombinedLogin />} />

// //             {/* Faculty Routes */}
// //             <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
// //             <Route path="/faculty/create-exam" element={<CreateExam />} />
// //             <Route path="/faculty/exams" element={<ExamList />} />
// //             {/* <Route path="/faculty/add-questions/:examId" element={<AddQuestions />} /> */}
// //             <Route path="/faculty/add-question" element={<AddQuestions />} />
// //             <Route path="/faculty/questions" element={<QuestionsList />} />
            
// //             {/* Student Routes */}
// //             <Route path="/student/dashboard" element={<StudentDashboard />} />
// //             <Route path="/student/exams" element={<StudentExams />} />
// //             <Route path="/student/results" element={<StudentResults />} />
// //             <Route path="/student/profile" element={<StudentProfile />} />

// //             {/* Shared */}
// //             <Route path="/change-password" element={<ChangePassword />} />
// //           </Routes>
// //         </div>
// //       </Layout>
// //     </>
// //   );
// // }
// import { Routes, Route, useLocation } from "react-router-dom";
// import CombinedLogin from "./CombinedLogin";

// import AdminLogin from "./pages/admin/AdminLogin";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminRoute from "./pages/admin/AdminRoute";
// import AdminLayout from "./pages/admin/AdminLayout";
// import FacultyList from "./pages/admin/FacultyList";
// import FacultyDetails from "./pages/admin/FacultyDetails";

// // Faculty Pages
// import FacultyDashboard from "./pages/Faculty/FacultyDashboard";
// import CreateExam from "./pages/Faculty/CreateExam";
// import ExamList from "./pages/Faculty/ExamList";
// import AddQuestions from "./pages/Faculty/AddQuestions";
// import QuestionsList from "./pages/Faculty/QuestionsList";
// import ExamDetails from "./pages/Faculty/ExamDetails";
// import SectionsList from "./pages/admin/SectionsList";
// import AddSection from "./pages/admin/AddSection";
// import SectionDetails from "./pages/admin/SectionDetails";

// import FacultyQuestions from "./pages/admin/faculty/FacultyQuestions";

// import StudentDashboard from "./pages/student/StudentDashboard";
// // import StudentExams from "./pages/student/StudentExams";
// // import StudentResults from "./pages/student/StudentResults";

// // Layouts
// import FacultyLayout from "./pages/Faculty/FacultyLayout";
// import StudentLayout from "./pages/student/StudentLayout"; // ✅ IMPORTANT

// // Shared
// import ChangePassword from "./pages/ChangePassword";
// import DisableScrollRestoration from "./DisableScrollRestoration";


// /* ================= LAYOUT ================= */
// function Layout({ children }) {
//   const location = useLocation();
//   const path = location.pathname;

//   const isLogin = path === "/";
//   const isFaculty = path.startsWith("/faculty");
//   const isStudent = path.startsWith("/student");

//   return (
//     <>
//       {!isLogin && isFaculty && <FacultyLayout />}
//       {!isLogin && isStudent && <StudentLayout />}

//       <main className={!isLogin ? "app-content" : ""}>
//         {children}
//       </main>
//     </>
//   );
// }

// /* ================= APP ================= */
// export default function App() {
//   return (
//     <><DisableScrollRestoration /><Layout>
//       <Routes>
//         <Route path="/" element={<CombinedLogin />} />

//         {/* Faculty */}
//         <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
//         <Route path="/faculty/create-exam" element={<CreateExam />} />
//         <Route path="/faculty/exams" element={<ExamList />} />
//         <Route path="/faculty/add-question" element={<AddQuestions />} />
//         <Route path="/faculty/questions" element={<QuestionsList />} />
//         <Route path="/faculty/exams/:examId" element={<ExamDetails />} />

//         <Route path="/admin" element={<AdminLogin />} />
//         <Route path="/admin" element={<AdminRoute />}>
//   <Route element={<AdminLayout />}>
//     <Route path="dashboard" element={<AdminDashboard />} />
//     <Route path="/admin/faculty" element={<FacultyList />} />
// <Route path="/admin/faculty/:facultyId" element={<FacultyDetails />} />
// <Route path="/admin/faculty/:facultyId/questions" element={<FacultyQuestions />} />
// {/* <Route path="/admin/faculty/:facultyId/exams" element={<FacultyExams />} />
// <Route path="/admin/faculty/:facultyId/sections" element={<FacultySections />} /> */}

// <Route path="/admin/sections" element={<SectionsList />} />
// <Route path="/admin/sections/add" element={<AddSection />} />
// <Route path="/admin/sections/:sectionId" element={<SectionDetails />} />
//   </Route>
// </Route>





//         {/* Shared */}
//         <Route path="/change-password" element={<ChangePassword />} />
//       </Routes>
//     </Layout></>
//   );
// }
import { Routes, Route } from "react-router-dom";
import CombinedLogin from "./CombinedLogin";

/* ================= ADMIN ================= */
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./pages/admin/AdminRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import FacultyList from "./pages/admin/FacultyList";
import FacultyDetails from "./pages/admin/FacultyDetails";
import SectionsList from "./pages/admin/SectionsList";
import AddSection from "./pages/admin/AddSection";
import SectionDetails from "./pages/admin/SectionDetails";
import FacultyQuestions from "./pages/admin/faculty/FacultyQuestions";

/* ================= FACULTY ================= */
import FacultyDashboard from "./pages/Faculty/FacultyDashboard";
import CreateExam from "./pages/Faculty/CreateExam";
import ExamList from "./pages/Faculty/ExamList";
import AddQuestions from "./pages/Faculty/AddQuestions";
import QuestionsList from "./pages/Faculty/QuestionsList";
import ExamDetails from "./pages/Faculty/ExamDetails";
import FacultyLayout from "./pages/Faculty/FacultyLayout";
import FacultyResults from "./pages/Faculty/FacultyResults";
import ExamAttempts from "./pages/Faculty/ExamAttempts";

/* ================= STUDENT ================= */
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentLayout from "./pages/student/StudentLayout";
import StudentExam from "./pages/student/StudentExams";
import ExamSubmitted from "./pages/student/ExamSubmitted";

import ExamFlowPage from "./pages/student/ExamFlowPage";
import { ExamFlowProvider } from "./context/ExamFlowContext";


/* ================= SHARED ================= */
import ChangePassword from "./pages/ChangePassword";
import DisableScrollRestoration from "./DisableScrollRestoration";
/* ================= APP ================= */
export default function App() {
  return (
    <>
      <DisableScrollRestoration />

      <Routes>
        {/* Login */}
        <Route path="/" element={<CombinedLogin />} />

        {/* ================= FACULTY ================= */}
        <Route
          path="/faculty/dashboard"
          element={
            <FacultyLayout>
              <FacultyDashboard />
            </FacultyLayout>
          }
        />

        <Route
          path="/faculty/create-exam"
          element={
            <FacultyLayout>
              <CreateExam />
            </FacultyLayout>
          }
        />

        <Route
          path="/faculty/exams"
          element={
            <FacultyLayout>
              <ExamList />
            </FacultyLayout>
          }
        />

        <Route
          path="/faculty/add-question"
          element={
            <FacultyLayout>
              <AddQuestions />
            </FacultyLayout>
          }
        />

        <Route
          path="/faculty/questions"
          element={
            <FacultyLayout>
              <QuestionsList />
            </FacultyLayout>
          }
        />

        <Route
          path="/faculty/exams/:examId"
          element={
            <FacultyLayout>
              <ExamDetails />
            </FacultyLayout>
          }
        />

        <Route
          path="/faculty/results"
          element={
            <FacultyLayout>
              <FacultyResults />
            </FacultyLayout>
          }
        />

        <Route
          path="/faculty/results/:examId"
          element={
            <FacultyLayout>
              <ExamAttempts />
            </FacultyLayout>
          }
        />

        ================= STUDENT =================
        <Route
          path="/student/dashboard"
          element={
            <StudentLayout>
              <StudentDashboard />
            </StudentLayout>
          }
        />
        {/* <Route
          path="/student/exams"
          element={
            <StudentLayout>
              <StudentExam />
            </StudentLayout>
          }
        /> */}

          <Route 
          path="/student/exam-submitted"
          element={
            <StudentLayout>
              <ExamSubmitted />
            </StudentLayout>
          }
        />
        
<Route
  path="/student/exams"
  element={
    <ExamFlowProvider>
      <StudentLayout>
        <StudentExam />
      </StudentLayout>
    </ExamFlowProvider>
  }
/>

<Route
  path="/student/exam-flow"
  element={
    <ExamFlowProvider>
        <ExamFlowPage />
    </ExamFlowProvider>
  }
/>



        {/* ================= ADMIN ================= */}
        <Route path="/admin" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="faculty" element={<FacultyList />} />
            <Route path="faculty/:facultyId" element={<FacultyDetails />} />
            <Route
              path="faculty/:facultyId/questions"
              element={<FacultyQuestions />}
            />
            <Route path="sections" element={<SectionsList />} />
            <Route path="sections/add" element={<AddSection />} />
            <Route
              path="sections/:sectionId"
              element={<SectionDetails />}
            />
          </Route>
        </Route>

        {/* ================= SHARED ================= */}
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </>
  );
}
