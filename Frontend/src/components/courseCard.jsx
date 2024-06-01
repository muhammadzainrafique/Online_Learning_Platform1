import { useEffect } from "react";
import { useAddToCartMutation } from "../features/courses/courseApiSlice";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ poster, title, description, price, instructor, courseId}) {

  const navigate = useNavigate();

  const [ addToCart, {data, isSuccess, isError, error}] = useAddToCartMutation();
  useEffect(()=>{
    if(isSuccess) {
      alert(data?.Message)
    }
    if(isError){
      alert(error?.data?.Message)
    }
  },[isSuccess, isError])
  const { userId } = useAuth();
  const handleGetCourse = async ()=>{
    await addToCart({courseId, studentId:userId})
  }
  const handleViewCourse = ()=>{
    navigate(`/viewcourse/${courseId}`)
  }
  const content = (
    <div  className="course-card">
      <img src={poster} alt="course-poster" />
      <div className="content">
      <p className="title">{title}</p>
      <p  className="instructor">Instructor: {instructor}</p>
      <p className="price">Price: {price}$</p>
      <button onClick={handleGetCourse} className="btn btn-secondry">Get Now</button>
      <button onClick={handleViewCourse} className="btn btn-primary">View Course</button>
      </div>
    </div>
  )
  return content;
}
