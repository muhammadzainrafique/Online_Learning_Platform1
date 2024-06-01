import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetInstructorCoursesQuery } from "./courseApiSlice";
import { useState } from "react";

export default function InstructorsCourses() {
  const [showNotification, setShowNotification] = useState(true);
  const { username: name, userId: id } = useAuth();
  const { isLoading, isError, error, isSuccess, data } =
    useGetInstructorCoursesQuery(id);

  let courses;
  if (isLoading) {
    courses = <p>Loading...</p>;
  }
  if (isError)
    courses = <p>{error?.data?.Message || "Something Went Wrong"}</p>;
  if (isSuccess) {
    courses = (
      <div>
        <table>
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Price</th>
              <th>Enrolled Students</th>
              <th>No. of Lessons</th>
            </tr>
          </thead>
          <tbody>
            {data?.Message?.courses.length ? (
              data?.Message?.courses.map((course, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/viewcourse/${course?._id}`}>
                      {course?.title}
                    </Link>
                  </td>
                  <td>{course?.price}$</td>
                  <td>
                    <Link to={`/courses/studentInfo/${course._id}`}>
                      {course?.studentsCount}
                    </Link>
                  </td>
                  <td>{course?.numberOfLessons}</td>
                </tr>
              ))
            ) : (
              <p>No Course Registerd Yet</p>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  const content = (
    <div className="instructor-courses">
      <p className="text-md">All Your Registered Course are : </p>
      {showNotification && (
  <div
    style={{
      backgroundColor: "#DBE3FF",
      padding: "1rem 3rem",
      color: "gray",
      margin: "1rem 0",
      position: "relative",
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)", 
      borderRadius: "8px", 
      
    }}
  >
    <span
      onClick={() => setShowNotification(false)}
      style={{
        position: "absolute",
        top: "0.5rem",
        right: "0.5rem",
        cursor: "pointer",
        fontSize: "1.25rem",
      }}
    >
      &times;
    </span>
    <p className="text-md">Info (*)</p>
    <ol style={{ marginTop: "1rem" }}>
      <li>Click Course Title to open Course Detail</li>
      <li>Click No.of Students to open Students Detail</li>
    </ol>
  </div>
)}

      {courses}
    </div>
  );

  return content;
}
