import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetInstructorCoursesQuery } from "../features/courses/courseApiSlice";
import useAuth from "../hooks/useAuth";
import UpdateCourseForm from "../features/courses/updateCourseForm";
function ManageCourses() {
  const navigate = useNavigate();

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
    console.log(data);
    courses = data?.Message?.courses.length ? (
      data?.Message.courses.map((course, index) => (
        <div className="course-card2" key={index}>
          <h3 className="course-title">{course?.title}</h3>
          <p className="course-description">{course?.description}</p>
          <div className="actions">
            <button className="btn btn-secondry"
            onClick={() => navigate(`/courses/updateCourse/${course?._id}`)}
            >
              Edit Course
            </button>
            <button
              onClick={() => navigate(`/viewcourse/${course?._id}`)}
              className="btn btn-secondry"
            >
              view Course
            </button>
            <button
              onClick={() => navigate(`/courses/addLecture/${course?._id}`)}
              className="btn btn-secondry"
            >
              Add Lecture
            </button>
            <button
            onClick={() => navigate(`/courses/instructor-view-course/${course?._id}`)}
            className="btn btn-secondry">Edit Lectures</button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-md">Something Went Wrong</p>
    );
  }
  const content = (
    <div className="manage-courses">
      <div
        style={{ position: "relative" }}
        className="manage-courses-container"
      >
        <h1>Manage Your Courses</h1>
        <p className="text-md add-course-link" style={{marginBlock:'1rem', cursor:'pointer'}}>
          <Link to={'/addcourse'}>Add New Course</Link>
        </p>
        <div className="course-list">{courses}</div>
      </div>
    </div>
  );
  return content;
}

export default ManageCourses;
