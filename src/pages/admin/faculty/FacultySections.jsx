export default function FacultySections() {
  const { facultyId } = useParams();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));

    axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/faculty/${facultyId}/sections`,
      { headers: { "x-admin-id": admin.id } }
    ).then(res => setSections(res.data));
  }, [facultyId]);

  return (
    <div className="page">
      <h2>Faculty Sections</h2>

      {sections.map(sec => (
        <div key={sec.id} className="list-card">
          <p>{sec.name}</p>
        </div>
      ))}
    </div>
  );
}
