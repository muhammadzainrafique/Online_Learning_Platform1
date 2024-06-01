import React, { useState } from "react";
import next from "../assets/images/next js.jpg";
import AllCourse from "../features/courses/AllCourse";
import CourseCard from "../components/courseCard";
import {
  useGetAllCategoriesQuery,
  useGetCoursesByCategoryQuery,
} from "../features/courses/courseApiSlice";

export default function Courses() {
  const [category, setCategory] = useState("all");
  const {
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesErrorMsg,
    data: categoriesData,
  } = useGetAllCategoriesQuery();
  const {
    isLoading: coursesLoading,
    isError: coursesError,
    error: coursesErrorMsg,
    data: coursesData,
  } = useGetCoursesByCategoryQuery(category.toLowerCase());

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  let categoriesContent;
  if (categoriesLoading) categoriesContent = <p>Loading categories...</p>;
  if (categoriesError)
    categoriesContent = (
      <p>{categoriesErrorMsg?.data?.message || "Something went wrong"}</p>
    );
  if (categoriesData) {
    categoriesContent = (
      <select onChange={handleCategoryChange}>
        <option value={"all"}>All</option>
        {categoriesData.Message.map((category, index) => (
          <option key={index}>{category.toUpperCase()}</option>
        ))}
      </select>
    );
  }

  let coursesContent;
  if (coursesLoading) {
    coursesContent = <p>Loading courses...</p>;
  } else if (coursesError) {
    coursesContent = (
      <p>{coursesErrorMsg?.data?.message || "Something went wrong"}</p>
    );
  } else {
    coursesContent =
      category === "" || category === "all" ? (
        <AllCourse />
      ) : (
        <>
          {coursesData?.Message?.length ? (
            coursesData.Message.map((course, index) => (
              <CourseCard
                key={index}
                poster={next}
                courseId={course._id}
                title={course.title}
                description={course.description}
                price={course.price}
                instructor={course?.instructor?.name}
              />
            ))
          ) : (
            <p>No course found</p>
          )}
        </>
      );
  }

  return (
    <section style={{ position: "relative" }} className="home-courses-showcase">
      <p style={{ textAlign: "center" }} className="text-xl">
        Our Courses
      </p>
      <span className="filter-courses">
        <p className="text-md">Filter Courses: {categoriesContent}</p>
      </span>

      <div className="home-course-cards">{coursesContent}</div>
    </section>
  );
}
