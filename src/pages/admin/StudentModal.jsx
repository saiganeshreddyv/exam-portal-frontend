import { useState, useEffect } from "react";
import "../../styles/admin/StudentModal.css";

export default function StudentModal({
  open,
  onClose,
  onSubmit,
  initialData = null
}) {
  const [form, setForm] = useState({
    roll_number: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    must_change_password: false
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        password: ""
      });
    }
  }, [initialData]);

  if (!open) return null;

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const submit = () => {
    onSubmit(form);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h2>{initialData ? "Edit Student" : "Add Student"}</h2>

        <input
          name="roll_number"
          placeholder="Roll Number"
          value={form.roll_number}
          onChange={handleChange}
        />

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="password"
          placeholder="Initial Password"
          value={form.password}
          onChange={handleChange}
        />

        <label className="checkbox">
          <input
            type="checkbox"
            name="must_change_password"
            checked={form.must_change_password}
            onChange={handleChange}
          />
          Must change password on first login
        </label>

        <div className="modal-actions">
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="primary" onClick={submit}>
            {initialData ? "Update Student" : "Add Student"}
          </button>
        </div>
      </div>
    </div>
  );
}
