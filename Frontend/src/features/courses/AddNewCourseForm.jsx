import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom'
import { useNewCourseMutation } from './courseApiSlice';

export default function AddNewCourseForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const { userId, role } = useAuth();
    const navigate = useNavigate();
    const [newCourse, { isSuccess, isError, error }] = useNewCourseMutation();

    useEffect(()=>{
        if(isSuccess) {
            navigate('/courses')
            console.log('course added verify form your database');
        }
        if(isError){
            console.log(error);
        }
    }, [isSuccess, isError])

    const handleAddCourseClicked = async (e) => {
        e.preventDefault();
        
        if( role === "instructor" ) {
            await newCourse({data: {title, description, category, price}, instructorId:userId})
        }
    }
    const content = (
        <div className="form-outer-box">
            <form onSubmit={handleAddCourseClicked} className="login-form basic-form">
                <p className="text-xl">New Course</p>
                <div className="form-box">
                    <label htmlFor="name">Title</label>
                    <input
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-box">
                    <label htmlFor="description">Description</label>
                    <textarea
                    // value={description}
                    placeholder='description'
                    onChange={(e)=>setDescription(e.target.value)}
                    required
                    rows="5">
                        {description}    
                    </textarea>
                </div>
                <div className="form-box">
                    <label htmlFor="email">Category</label>
                    <select
                     value={category}
                     onChange={e=>setCategory(e.target.value)}
                     >
                        <option value="web-development">Web Development</option>
                        <option value="app-development">App Development</option>
                        <option value="machine-learning">Machine Learning</option>
                    </select>
                </div>
                <div className="form-box">
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        placeholder="price"
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}
                        required
                    />
                </div>
                <button className="btn btn-secondry">Add Course</button>
               
            </form>
        </div>
    )
    return content;

}
