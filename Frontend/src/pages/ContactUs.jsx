import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNewMessgeMutation } from "../features/Message/messageApiSlice";

const ContactUs = () => {
  const { username, userId } = useAuth();
  const [name, setName] = useState((username.length && username) || "");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [
    newMessge,
    {
      isError,
      error,
      data,
      isSuccess
    }
  ] = useNewMessgeMutation();
  useEffect(()=>{
    if(isSuccess) alert(data?.Message || "Thanks for your messge");
    if(isError) console.log(error?.data?.Message);
    if(isSuccess || isError){
      setName('');
      setEmail('');
      setMessage('');
    }
  },[isSuccess, isError])
  const handleSubmitMessage = async (e)=>{
    e.preventDefault();
    await newMessge({name, email, message, userId})
  }
  return (
    <div className="contact-us-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          If you have any questions or inquiries, feel free to reach out to us!
        </p>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmitMessage}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="name"
              name="name"
              placeholder="Your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              name="email"
              placeholder="Your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
              placeholder="Your message"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-secondry">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
