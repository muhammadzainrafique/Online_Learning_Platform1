import { useSelector } from "react-redux";
import { FaCartPlus, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import userImage from "../assets/images/zain.png";
import { HiPencil } from "react-icons/hi";
import useAuth from "../hooks/useAuth";
import { GiHamburgerMenu } from "react-icons/gi";


// export default function Header() {
//   let content;
//   const [show, setShow] = useState(false);
//   const { username, role } = useAuth();
//   content = (
//     <header>
//       <div className="logo">
//         <h3>Skill Lifter</h3>
//       </div>
//       <span onClick={()=>setShow(!show)} className="responsive-menu">
//         <GiHamburgerMenu />
//       </span>
//       <div className={`nav-content ${show ? 'show' : ''}`}>
//         <div className="nav-links">
//           <Link to={"/"}>Home</Link>
//           <Link to={"courses"}>Courses</Link>
//           <Link to={"/about"}>About Us</Link>
//           <Link to={"/contact"}>Contact</Link>
//           {role === "instructor" && (
//             <Link to={"/manage-courses"}>Manage Courses</Link>
//           )}
//         </div>
//       </div>
//     </header>
//   );

//   return content;
// }

export default function Header() {
  const isUserLoggedIn = useSelector(state => state.auth.token) ? true : false;
  const navigate = useNavigate();
  const {username, role} =useAuth();
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])
  const handleChangeProfileClick = () => {
    console.log('profile photo is clicked');
  }
  const content = (
    <header>
      <div className="logo">
        <h3>Skill Lifter</h3>
      </div>

      <div className="nav-content">
        <div className="nav-links">
          <Link to={'/'}>Home</Link>
          <Link to={'courses'}>Courses</Link>
          <Link to={'/about'} >About Us</Link>
          <Link to={'/contact'} >Contact</Link>
          {role==="instructor" && (<Link to={'/manage-courses'} >Manage Courses</Link>)}
        </div>

      </div>
      {
        isUserLoggedIn ?
          <>
            {role==="student" && (<FaCartPlus onClick={()=> navigate('/enrolled-courses')} />)}
            <div >
              <div onClick={(e) => setIsOpen(!isOpen)}>
                <img src={userImage} alt="user-profile-image" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
              </div>
              {isOpen && (
                <div className="modal1">
                  <div className="modal-content1">
                    <span onClick={handleChangeProfileClick} style={{ position: 'absolute', top: '2%', right: '15%' }}>
                      <div class="file-upload-container">
                        <input type="file" className="file-input" id="fileInput" />
                        <label htmlFor="fileInput" className="file-icon"><HiPencil/></label>
                      </div>
                    </span>
                    <img src={userImage} alt="user-profile-image" />
                    <div className="info-content" onClick={(e) => setIsOpen(!isOpen)}>
                      <p>{username}</p>
                      <p>zain@test.com</p>
                      <Link to={'/editUser'}>edit profile</Link>
                      {role === "instructor" && (<Link to={'/instructor-courses'}>View All Courses</Link>)}
                      <button className="btn btn-secondry">Logout</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </> :
          <div className="header-buttons">
            <button className="btn btn-primary">
              <Link to={'/login'} >Login</Link>
            </button>
            <button className="btn btn-secondry">
              <Link style={{ color: 'white' }} to={'/signup'} >Sign Up</Link>
            </button>
          </div>
      }

    </header>
  )

  return content;
}
