import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNewUserMutation } from "./userApiSlice";
import { userExist } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function NewUserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [
        newUser,
        { isSuccess, isError, error, data}
    ] = useNewUserMutation();
    useEffect(()=>{
        if(isSuccess){
            console.log('New user is created');
            dispatch(userExist(data?.Message));
            navigate('/')
        }
        if(isError){
            console.log(error);
        }
    }, [isSuccess, isError])
    const handleNewUserClicked = async (e)=>{
        e.preventDefault();
        await newUser({name, email, password});
    }
    const content = (
        <div className="form-outer-box">
            <form className="login-form basic-form" onSubmit={handleNewUserClicked}>
                <p className="text-xl">Sign Up Form</p>
                <div className="form-box">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-box">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-box">
                    <label htmlFor="email">Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn btn-secondry">Login</button>
               
            </form>
        </div>
    )
    return content;
}
