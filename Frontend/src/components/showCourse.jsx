import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "../features/courses/courseApiSlice";
import ViewCourse from "./ViewCourse";

export default function ShowCourse() {
  let content;
  let { id:courseId } = useParams();
  console.log(courseId, useParams())
  const { isLoading, isError, error, isSuccess, data} = useGetCourseQuery(courseId);
  if(isLoading) content = <p>Loading...</p>
  if(isError) content = <p>{error?.data?.message} || Something Went Wrong</p>
  if(isSuccess){
    const { title, description, instructor, price, updatedAt, lessons, _id } = data?.Message;
    content = <ViewCourse
    title={title}
    description={description}
    price={price}
    instructor={instructor}
    updatedAt={updatedAt}
    lectures={lessons}
    courseId={_id}
    />
  }


  return content;
}
