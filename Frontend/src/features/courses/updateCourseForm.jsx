import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} from "./courseApiSlice";
import { FaTrashAlt } from "react-icons/fa";
export default function UpdateCourseForm({
  courseTitle,
  courseDesciption,
  courseCategory,
  cousrsePrice,
  courseId,
}) {
  const [title, setTitle] = useState(courseTitle || "");
  const [description, setDescription] = useState(courseDesciption || "");
  const [category, setCategory] = useState(courseCategory || "");
  const [price, setPrice] = useState(cousrsePrice || "");
  const { role } = useAuth();
  const navigate = useNavigate();
  const [
    updateCourse,
    { isSuccess, isError, error }
    ] = useUpdateCourseMutation();
  const [
    deleteCourse,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError,data },
  ] = useDeleteCourseMutation();
  useEffect(() => {
    if (isSuccess) {
      alert("course updated");
      navigate("/manage-courses");
    }
    if(isDelSuccess) {
        alert(data?.Message);
        navigate("/manage-courses");
    }
    if (isError ) console.log(error?.data?.Message )
    if ( delError) alert(delError?.data?.Message)
  }, [isSuccess, isError, isDelSuccess, isDelError]);

  const handleUpdateCourseClicked = async (e) => {
    e.preventDefault();
    if (role === "instructor") {
      await updateCourse({
        courseId,
        data: { title, description, category, price },
      });
    }
  };
  const handleDeleteCourseClicked = async (e) => {
    e.preventDefault();
    if (role === "instructor") {
        await deleteCourse(courseId);
    }
  }
  const content = (
    <div className="form-outer-box">
      <form
        onSubmit={handleUpdateCourseClicked}
        className="login-form basic-form"
        style={{ position: "relative" }}
      >
        <p className="text-xl">Edit Course</p>
        <span onClick={handleDeleteCourseClicked} style={{ position: "absolute", right: "5%" }}>
          <FaTrashAlt />
        </span>
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
          <label htmlFor="email">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="web-development">Web Development</option>
            <option value="app-development">App Development</option>
            <option value="machine-learning">Machine Learning</option>
          </select>
        </div>
        <div className="form-box">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-secondry">Update Course</button>
      </form>
    </div>
  );
  return content;
}
