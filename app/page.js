"use client";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import Navbar from "../app/components/NavBar";
import DarkModeToggle from "../app/components/DarkModeToggle";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    blood_group: "",
    dept: "",
    usn: "",
    gender: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.error("Error fetching user:", error);
      setUser(data?.user || null);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const { data, error } = await supabase.from("students").select("*");
    if (error) {
      console.error("Error fetching students:", error.message);
    } else {
      setStudents(data || []);
    }
  };

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
      setStudents([...students, ...data]);
      setNewStudent({ name: "", blood_group: "", dept: "", usn: "", gender: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to Dashboard</h1>
        <p className="text-gray-600 text-center">A place to connect with developers and share ideas</p>
        <DarkModeToggle className="mx-auto my-4" />
        {user ? <p className="text-center text-green-600 font-semibold">Logged in as: {user.email}</p> : <p className="text-center text-red-600 font-semibold">Please login to access features</p>}
        
        <h2 className="text-xl font-semibold mt-6">Student List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {students.length > 0 ? (
            students.map((student) => (
              <div key={student.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-semibold">{student.name}</h3>
                <p className="text-gray-600">Blood Group: {student.blood_group}</p>
                <p className="text-gray-600">Department: {student.dept}</p>
                <p className="text-gray-600">USN: {student.usn}</p>
                <p className="text-gray-600">Gender: {student.gender}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No students found</p>
          )}
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">Add New Student</h2>
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg shadow mt-4">
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
          <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Student</button>
        </form>
      </div>
    </div>
  );
}
