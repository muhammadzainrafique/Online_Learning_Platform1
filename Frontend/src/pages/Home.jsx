import React from 'react'
import CourseCard from '../components/courseCard';
import Testimonial, { WhyUsCard } from '../components/Testimonial';
import image from '../assets/images/about us image.png'
import image2 from '../assets/images/next2.png'

import next from '../assets/images/next js.jpg'
import { Link } from 'react-router-dom';
export default function Home() {
  const cards = [
    {
      poster:next,
      title: "Next js For Beignners",
      description: "Next.js is an open-source web development framework created by the private company Vercel ",
      instructor: "John Mosh",
      price: 30
    },
    {
      poster:image2,
      title: "Next js For Beignners",
      description: "Next.js is an open-source web development framework created by the private company Vercel ",
      instructor: "John Mosh",
      price: 30
    },
    {
      poster:next,
      title: "Next js For Beignners",
      description: "Next.js is an open-source web development framework created by the private company Vercel",
      instructor: "John Mosh",
      price: 30
    },
    {
      poster:image2,
      title: "Next js For Beignners",
      description: "Next.js is an open-source web development framework created by the private company ",
      instructor: "John Mosh",
      price: 30
    },

  ]
  const testimonials = [
    {
      name: "Muhammad Zain",
      role: "Student",
      context: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore deleniti impedit voluptatum minus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore deleniti impedit voluptatum minus Optio odio facilis voluptatem magnam similique omnis?"
    },
    {
      name: "Muhammad Zain",
      role: "Student",
      context: "Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore deleniti impedit voluptatum minus amet consectetur adipisicing elit. Inventore deleniti impedit voluptatum minus. Optio odio facilis voluptatem magnam similique omnis?"
    },
    {
      name: "Muhammad Zain",
      role: "Student",
      context: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore deleniti impedit voluptatum minus consectetur adipisicing elit. Inventore deleniti impedit voluptatum minus. Optio odio facilis voluptatem magnam similique omnis?"
    },
  ]
  const whyUs = [
    {
      title:"Expert Instructors",
      description:"Our courses are created and taught by industry experts and experienced educators who are passionate about sharing their knowledge and expertise with others.",
    },
    {
      title:"Wide Range of Courses",
      description:"Whether you're looking to advance your career, explore new interests, or develop new skills, we offer a diverse range of courses spanning various subjects, industries, and skill levels.",
    },
    {
      title:"Flexible Learning Options",
      description:"With our online platform, learning fits seamlessly into your busy schedule. Access courses anytime, anywhere, and learn at your own pace from the comfort of your home or on the go.",
    },
    {
      title:"Flexible Learning Options",
      description:"With our online platform, learning fits seamlessly into your busy schedule. Access courses anytime, anywhere, and learn at your own pace from the comfort of your home or on the go.",
    },
    {
      title:"Expert Instructors",
      description:"Our courses are created and taught by industry experts and experienced educators who are passionate about sharing their knowledge and expertise with others.",
    },
    {
      title:"Wide Range of Courses",
      description:"Whether you're looking to advance your career, explore new interests, or develop new skills, we offer a diverse range of courses spanning various subjects, industries, and skill levels.",
    },
  ]
  const content = (
    <section className="home-container">
      <section className="home-hero">
        <div className="hero-content">
          <h1 className='text-xxl' >Empower Your Learning <br /> Journey</h1>
          <p className="text-xl">Start Learning Now</p>
          <Link to={'/courses'}><button className="btn btn-primary">Explore Courses</button></Link>
        </div>
      </section>
      <section className="home-courses-showcase">
        <p style={{ textAlign: 'center' }} className="text-xl">Most Viewed Course</p>
        <div className="home-course-cards">
          {
            cards.map((card, index) => <CourseCard
              poster={card.poster}
              key={index}
              title={card.title}
              description={card.description}
              instructor={card.instructor}
              price={card.price}
            />)
          }
        </div>
      </section>
      
      <section className="about-us-section">
        <div className="introduction">
          <h1 className='text-xl'>About Skill Lifter</h1>
          <p>Welcome to Skill Lifter, your trusted destination for online learning and skill development! For over four years, we've been dedicated to empowering individuals like you to unlock their full potential and achieve their goals through high-quality online courses.</p>
          <button className="btn btn-primary">Learn More</button>
        </div>
        <div>
          <img src={image} alt="picture of man" />
        </div>
        
        
      </section>
      <section className="testimonial">
        <p style={{ textAlign: 'center' }} className='text-xl'> Our Clients Reviews</p>
        <div className="testimonials">
          {
            testimonials.map((testimonial, index) => <Testimonial
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              context={testimonial.context}
            />)
          }
        </div>
      </section>
      
      {/* <div className='why-us'>
        <h1>Why Choose Skill Lifter?</h1>
          <div className="why-us-boxes">
            {
              whyUs.map((card, index)=> <WhyUsCard
              key={index}
              title={card.title}
              description={card.description}
              />)
            }
          </div>

        </div> */}
    </section>
  )

  return content;
}
