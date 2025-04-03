"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import Navbar from "./components/NavBar";

export default function StudentList() {
  const [students, setStudents] = useState([]);

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

  return (
    <div className="p-6">
        <Navbar />
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Student List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {students.length > 0 ? (
          students.map((student) => (
            <div
              key={student.id}
              className="bg-gradient-to-br from-blue-400 to-purple-500 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <h3 className="text-lg font-semibold">{student.name}</h3>
              <p className="text-sm">🆔 <strong>ID:</strong> {student.id}</p>
              <p className="text-sm">🩸 <strong>Blood Group:</strong> {student.blood_group}</p>
              <p className="text-sm">🏫 <strong>Department:</strong> {student.dept}</p>
              <p className="text-sm">🎓 <strong>USN:</strong> {student.usn}</p>
              <p className="text-sm">⚥ <strong>Gender:</strong> {student.gender}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No students found</p>
        )}
      </div>
    </div>
  );
}
