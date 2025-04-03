import { useState } from "react";
import supabase from "@/lib/supabase";

export default function StudentForm({ onStudentAdded }) {
  const [newStudent, setNewStudent] = useState({
    name: "",
    blood_group: "",
    dept: "",
    usn: "",
    gender: "",
  });

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.usn) {
      alert("Name and USN are required!");
      return;
    }

    const { data, error } = await supabase.from("students").insert([newStudent]).select();
    if (error) {
      console.error("Error inserting student:", error.message);
    } else if (Array.isArray(data)) {
      onStudentAdded(data);
      setNewStudent({ name: "", blood_group: "", dept: "", usn: "", gender: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg shadow">
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(newStudent).map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace("_", " ").toUpperCase()}
            value={newStudent[field]}
            onChange={handleChange}
            required={field === "name" || field === "usn"}
            className="border p-2 rounded w-full"
          />
        ))}
      </div>
      <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Add Student
      </button>
    </form>
  );
}
