import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetCourseQuery } from './courseApiSlice';
import UpdateCourseForm from './updateCourseForm';

export default function UpdateCourse() {
  const { id:courseId} = useParams();
  const { isLoading, isError, error, isSuccess, data } = useGetCourseQuery(courseId);
  let content;
  if(isLoading) content = <p>Loading...</p>
  if(isError) content = <p>`${error?.data?.message} || 'Something Went Wrong'`</p>
  if(isSuccess) {
    const course = data?.Message;
    content = <UpdateCourseForm
    courseTitle={course?.title}
    courseDesciption={course?.description}
    courseCategory={course?.category}
    cousrsePrice={course?.price}
    courseId={courseId}
    />
  }

  return content;
}
