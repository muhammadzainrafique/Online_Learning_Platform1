import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useAddLectureMutation, useGetCourseQuery } from "./courseApiSlice";

export default function AddNewLecture() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const { userId, role } = useAuth();
  const { id: courseId } = useParams();
  const navigate = useNavigate();

  const [addLecture, { isError, isSuccess, data, error }] =
    useAddLectureMutation();

  const {
    isLoading: isCourseLoading,
    isError: isCourseError,
    isSuccess: isCourseSuccess,
    data: courseData,
    error: courseError,
  } = useGetCourseQuery(courseId);

  let courseDetails;
  if(isCourseLoading) courseDetails = <p>Loading...</p>
  if(isCourseError) courseDetails = <p>{courseError?.data}</p>
  if(isCourseSuccess) {
    const { title, createdAt, updatedAt, students, lessons } = courseData.Message;
    courseDetails = <div>
      <p className="text-xxl">{title}</p>
        <br />
        <table>
          <tbody>
            <tr>
              <td>Total Lectures</td>
              <td>{lessons?.length || 0}</td>
            </tr>
            <tr>
              <td>Total Students</td>
              <td>{students?.length || 0}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{new Date(createdAt).toUTCString()}</td>
            </tr>
            <tr>
              <td>Update At</td>
              <td>{new Date(updatedAt).toUTCString()}</td>
            </tr>
          </tbody>
        </table>
    </div>
  }
  useEffect(() => {
    if (isSuccess) {
      alert("Lecture Added Successfully");
    }
    if (isError) {
      console.log(error?.data?.message);
    }
  }, [isSuccess, isError]);
  const handleAddLectureClicked = async (e) => {
    e.preventDefault();
    const data = { title, description, videoLink };
    await addLecture({ data, courseId, instructorId: userId });
  };
  const content = (
    <div className="add-lecture-container">
      <div>
        {courseDetails}
      </div>
      <div className="">
        <form
          onSubmit={handleAddLectureClicked}
          className="login-form basic-form"
        >
          <p className="text-xl">New Lecture</p>
          <div className="form-box">
            <label htmlFor="name">Title</label>
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-box">
            <label htmlFor="description">Description</label>
            <textarea
              // value={description}
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="5"
            >
              {description}
            </textarea>
          </div>
          <div className="form-box">
            <label htmlFor="video Link">Video Link</label>
            <input
              type="text"
              placeholder="video link"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-secondry">Add Lecture</button>
        </form>
      </div>
    </div>
  );
  return content;
}
