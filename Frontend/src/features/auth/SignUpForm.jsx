import { useState } from "react";

export default function SignUpForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const content = (
        <div className="form-outer-box">
            <form className="login-form basic-form">
                <p className="text-xl">Sign Up Form</p>
                <div className="form-box">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-box">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-box">
                    <label htmlFor="email">Password</label>
                    <input
                        type="password"
                        placeholder="Create password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn btn-secondry">Sign Up</button>
               
            </form>
        </div>
    )
    return content;
}
