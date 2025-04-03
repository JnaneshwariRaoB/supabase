import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";

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
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mt-6">Student List</h2>
      <table className="w-full border-collapse border border-gray-300 mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Blood Group</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">USN</th>
            <th className="border p-2">Gender</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id} className="text-center hover:bg-gray-100">
                <td className="border p-2">{student.id}</td>
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{student.blood_group}</td>
                <td className="border p-2">{student.dept}</td>
                <td className="border p-2">{student.usn}</td>
                <td className="border p-2">{student.gender}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border p-2 text-center text-gray-500">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
