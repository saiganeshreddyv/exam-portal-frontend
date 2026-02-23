export default function FacultyExams() {
  const { facultyId } = useParams();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));

    axios.get(
      `http://localhost:5000/api/admin/faculty/${facultyId}/exams`,
      { headers: { "x-admin-id": admin.id } }
    ).then(res => setExams(res.data));
  }, [facultyId]);

  return (
    <div className="page">
      <h2>Faculty Exams</h2>

      {exams.map(exam => (
        <div key={exam.id} className="list-card">
          <h4>{exam.title}</h4>
          <p>Date: {exam.date}</p>
          <p>Status: {exam.is_active ? "Active" : "Inactive"}</p>
        </div>
      ))}
    </div>
  );
}
