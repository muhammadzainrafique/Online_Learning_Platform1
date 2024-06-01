import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Courses from './pages/Courses'
import About from './pages/About'
import Login from './features/auth/Login'
import SignUpForm from './features/auth/SignUpForm'
import AddNewCourseForm from './features/courses/AddNewCourseForm'
import NewUserForm from './features/users/NewUserForm'
import EditUserForm from './features/users/EditUserForm'
import ChangePassword from './features/users/ChangePassword'
import InstructorsCourses from './features/courses/InstructorsCourses'
import EnrolledCourses from './features/courses/enrolledCourses'
import ManageCourses from './pages/ManageCourses'
import ShowCourse from './components/showCourse'
import AddNewLecture from './features/courses/AddNewLecture'
import StudentsList from './components/StudentsList'
import UpdateCourse from './features/courses/updateCourse'
import InstructorViewCourse from './features/courses/InstructorViewCourse'
import ContactUs from './pages/ContactUs'

const App = () => {
  return <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}  />
      <Route path='/courses' element={<Courses/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<ContactUs/>} />
      <Route path='/login' element={<Login/>}  />
      <Route path='/signup' element={<SignUpForm/>}  />

      {/* users routes */}
      <Route path='/newUser' element={<NewUserForm/>} />
      <Route path='/editUser' element={<EditUserForm/>} />
      <Route path='/changePassword' element={<ChangePassword/>} />

      {/* courses routes */}
      <Route path='/addcourse' element={<AddNewCourseForm/>} />
      <Route path='/viewcourse/:id' element={<ShowCourse/>} />
      <Route path='/instructor-courses' element={<InstructorsCourses/>} />
      <Route path='/enrolled-courses' element={<EnrolledCourses/>} />
      <Route path='/manage-courses' element={<ManageCourses/>} />
      <Route path='/courses/addLecture/:id' element={<AddNewLecture/>} />
      <Route path='/courses/studentinfo/:id' element={<StudentsList/>} />
      <Route path='/courses/updateCourse/:id' element={<UpdateCourse/>} />
      <Route path='/courses/instructor-view-course/:id' element={<InstructorViewCourse/>} />
    </Routes>
  
  </>
}

export default App
