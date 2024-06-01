import { useEffect, useState } from "react";
import { useUpdateProfileMutation, useGetUserQuery } from "./userApiSlice";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function EditUserForm() {
  const { userId } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const {
    isLoading: isProfileLoading,
    isSuccess: isProfileSuccess,
    isError: isProfileError,
    error: profileError,
    data: profileData,
  } = useGetUserQuery(userId);
  
  useEffect(()=>{
    if(isProfileSuccess){
        const { name, email} = profileData?.Message;
        setName(name);
        setEmail(email);
      }
      if(isProfileError)
        console.log(profileData?.Message)
  },[isProfileSuccess, isProfileError])
  

  const navigate = useNavigate();
  const [updateProfile, { isSuccess, isError, error, data }] =
    useUpdateProfileMutation();
  useEffect(() => {
    if (isSuccess) {
      alert("Profile Updated");
      navigate('/')
    }
    if (isError) {
      alert(error?.data?.Message)
    }
  }, [isSuccess, isError]);
  const handleNewUserClicked = async (e) => {
    e.preventDefault();
    const obj = {
      userId,
      data: {
        email,
        name,
      },
    };
    await updateProfile(obj);
  };
  const content = (
    isProfileLoading?
     <p>Loading...</p>:
     <div className="form-outer-box">
      <form className="login-form basic-form" onSubmit={handleNewUserClicked}>
        <p className="text-xl">Update Profile</p>
        <div className="form-box">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-box">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-secondry">Save Changes</button>
        <Link to={"/changePassword"}>Change Password</Link>
      </form>
    </div>
  );
  return content;
}
