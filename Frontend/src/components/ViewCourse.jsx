// import React, { useState } from 'react'
// import poster from '../assets/images/next js.jpg'
// // import poster from '../assets/images/next2.png'
// // import poster from '../assets/images/my own.png'
// import { MdExpandLess, MdExpandMore } from "react-icons/md";
// // {title, description, poster, id, price}
// export default function ViewCourse() {
//     const title = "Automate the Boring Stuff with Python Programming"
//     const description = "A practical programming course for office workers, academics, and administrators who want to improve their productivity."
//     const price = 15
//     const chapters = [
//       "python Basic", "Flow Control", "Fucntions", "Error Handling", "Lists"
//     ]
//   const content = (
//     <>
//     <div className="view-course">
//         <div style={{position:'relative'}} className="view-course-content">
//             <p className="text-xxl">{title}</p>
//             <p>{description}</p>
//             <p style={{position:'absolute',textAlign:'center', bottom:'3%'}}>Created By: Muhammad Zain</p>
//         </div>
//         <div className="view-course-outer-card">
//           <div className="view-course-card course-card">
//             <img src={poster} alt="course-poster" />
//             <div className="card-content">
//             <p ><span className="text-xxl">${price}</span> only </p>
//             <div className="buttons">
//             <button className="btn btn-primary">Add To Cart</button>
//             <button className="btn btn-secondry">Buy Now</button>

//             </div>
//             </div>
//           </div>
//         </div>
//     </div>
//     <div className="course-content">
//       <p className="text-xl">Course Content</p>
//       <ul style={{marginLeft:'1rem'}}>
//         <li>16 Sections</li>
//         <li>32 Lectures</li>
//       </ul>
//       <div className="chapters-section">
//         {
//           chapters.map((chapter, index)=> <ShowChapter
//           key={index}
//           chapter={chapter}/>)
//         }
//       </div>
//     </div>
//     </>
//   )
//   return content;
// }

// const ShowChapter = ({chapter}) =>{
//   const [expandMore, setExpandMore] = useState(false);

//   const content = (
//     <div onClick={() => setExpandMore(!expandMore)} className="course-chapter">
//       <div className="course-chapter-labels">
//       <p>{expandMore?<MdExpandLess/>:<MdExpandMore/>}   {chapter}</p>
//       <p> 3 lectures</p>
//       </div>
//       <div style={{display:expandMore?'block':'none'}} className="course-chapter-detail">

//       </div>
      
//     </div>
//   )
//   return content
// }





// ViewCourse.jsx

import React, { useState } from 'react';
import poster from '../assets/images/next js.jpg';
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';



const ViewCourse = ({title, description, price, instructor, updatedAt, lectures, courseId}) => {
  const { role, subscription, username } = useAuth();
  const ShowChapter = ({ chapter }) => {
    const [expandMore, setExpandMore] = useState(false);

    return (
      <div className="course-chapter" >
        <div className="course-chapter-labels">
          <p  onClick={() => setExpandMore(!expandMore)}>{expandMore ? <MdExpandLess  /> : <MdExpandMore onClick={() => setExpandMore(!expandMore)} />} {chapter?.title}</p>
        </div>
        <div className="course-chapter-detail" style={{ display: expandMore ? 'block' : 'none' }}>
          <p>{chapter?.description}</p>
          {
            (subscription === "enrolled"  || instructor?.name === username) && <div className="video-player" style={{display: expandMore?'block':'none'}}>
            <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${chapter.videoLink}`}
                  title="YouTube Video Player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
              ></iframe>
            </div>
          }
        </div>
      </div>
    );
  };

  return (
    <>
      
      { (role === "instructor" && instructor?.name === username) && <Link to={`/courses/addLecture/${courseId}`}><p className="text-md">Add Lecture</p></Link>}
      <div className="view-course">
        <div className="view-course-content">
          <p className="text-xxl">{title}</p>
          <p>{description}</p> <br />
          <p className="course-author">Created By: {instructor?.name}</p>
          <p className="course-author">Update At: {new Date(updatedAt).toUTCString()}</p>
        </div>
        <div className="view-course-outer-card">
          <div className="view-course-card course-card">
            <img src={poster} alt="course-poster" />
            <div className="card-content">
              <p><span className="text-xxl">${price}</span> only </p>
              <div className="buttons">
                <button className="btn btn-primary">Add To Cart</button>
                <button className="btn btn-secondary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="course-content">
        <p className="text-xl">Course Content</p>
        <ul className="course-content-list">
          <li>{lectures?.length || 0} Lectures</li>
        </ul>
        <div className="chapters-section">
          {lectures.map((chapter, index) => <ShowChapter key={index} chapter={chapter} />)}
        </div>
      </div>
    </>
  );
};

export default ViewCourse;
