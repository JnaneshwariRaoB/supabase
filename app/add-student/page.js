"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";
import Navbar from "../components/NavBar";

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
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-600 flex flex-col items-center py-10">
      <Navbar />
      <div className="mt-16 w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Add New Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(newStudent).map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.replace("_", " ").toUpperCase()}
              value={newStudent[field]}
              onChange={handleChange}
              required={field === "name" || field === "usn"}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          ))}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            ➕ Add Student
          </button>
        </form>
      </div>
    </div>
  );
}
