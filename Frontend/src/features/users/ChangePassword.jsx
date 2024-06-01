import { useEffect, useState } from "react";
import { useChangePasswordMutation } from "./userApiSlice";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [
        changePassword,
        { isSuccess, isError, error, data }
    ] = useChangePasswordMutation();
    useEffect(()=>{
        if(isSuccess){
            console.log(data?.Message);
            navigate('/editUser');
        }
        if(isError){
            console.log(error);
        }
    },[isSuccess, isError])
    const handleChangePasword = async (e)=>{
        e.preventDefault();
        if(newPassword !== confirmPassword)
            return alert("Passwords are Not Same")

        await changePassword({userId:'65e56a953f3a392782de274d', data: {oldPassword, password : newPassword }});

    }
    const content = (
        <div className="form-outer-box">
            <form className="login-form basic-form" onSubmit={handleChangePasword}>
                <p className="text-xl">Change Password</p>
                <div className="form-box">
                    <label htmlFor="email">Old Password</label>
                    <input
                        type="password"
                        placeholder="old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-box">
                    <label htmlFor="email">New Password</label>
                    <input
                        type="password"
                        placeholder="new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-box">
                    <label htmlFor="email">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn btn-secondry">Update Password</button>
            </form>
        </div>
    )

    return content;
}
