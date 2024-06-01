import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { userExist } from "./authSlice";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [
        login,
        {isSuccess, isLoading, isError, error, data}
        ]= useLoginMutation();
    useEffect(()=>{
        if(isSuccess){
            dispatch(userExist(data?.Message))
            navigate('/');
        }
        if(isError){
            console.log(error || "Something went wrong")
        }
    },[isSuccess, isError])

    const handleLoginSubmit = async (e)=>{
        e.preventDefault();
        console.log(' i am clicked');
        const credentials = {
            email,
            password
        }
        console.log(credentials);
        await login(credentials);
    }
    const content = (
        <div className="form-outer-box">
            <form className="login-form basic-form" onSubmit={handleLoginSubmit}>
                <p className="text-xl">Login Form</p>
                <div className="form-box">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        placeholder="Your email"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-box">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Your password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn btn-secondry">Login</button>
                <div className="new-account-link">
                    <p>or</p>
                    <Link to={'/signup'}>Create New Account</Link>
                </div>
            </form>
        </div>
    )
    return content;
}
