import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useGetEnrolledCourseQuery } from "./courseApiSlice";
import { Link } from "react-router-dom";

export default function EnrolledCourses() {
    const { userId } = useAuth();
    const [fullDesc, setFullDesc] = useState(false);
    const [showDescriptionRow, setShowDescitptionRow] = useState(-1);
  const { isLoading, isSuccess, isError, error, data } =
    useGetEnrolledCourseQuery(userId);
  let courses;
  if (isLoading) courses = <p>Loading...</p>;
  if (isError)
    courses = <p>{error?.data?.message || "something went wrong"}</p>;
  if (isSuccess) {
   courses =  <div>
      <table>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Description</th>
            <th>Instructor</th>
            <th>Enrolled Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.Message?.length ? (
            data?.Message?.map((course, index) => (
              <tr key={index}>
                <td><Link to={`/viewcourse/${course._id}`}>{course?.title}</Link></td>
                <td>{fullDesc?course?.description : course?.description.split(' ').slice(0, 5).join(' ')} <span
                 style={{color:'blue', cursor:'pointer'}}
                 onClick={()=>{setFullDesc(!fullDesc)}}
                 >{fullDesc?"Show Less" : "Read More"}</span></td>
                <td>{course?.instructor?.name}</td>
                <td>{new Date(course?.enrollmentDate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <p>No Course Registerd Yet</p>
          )}
        </tbody>
      </table>
    </div>;
  }
  const content = (
    <div className="enrolled-course">
      <p className="text-md">Here are Your Enrolled Courses</p>
      {courses}
    </div>
  );
  return content;
}
