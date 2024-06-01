import CourseCard from "../../components/courseCard";
import { useAllCoursesQuery } from "./courseApiSlice";
import next from '../../assets/images/next js.jpg'
export default function AllCourse() {
  const { isLoading, isError, error, data, isSuccess } = useAllCoursesQuery();
  let content;
  if(isLoading) content = <p>Loading...</p>
  if (isSuccess) {
    const courses = data?.Message;
    console.log(courses);
    content = courses.map((course, index) => <CourseCard
            poster={next}
            key={index}
            title={course.title}
            description={course.description}
            instructor={course?.instructor?.name}
            price={course.price}
            courseId = {course._id}
          />)
  }
  return content;
}
