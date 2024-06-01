import image from '../assets/images/about us image.png'
import missionImage from '../assets/images/mission.jpg'
export default function About() {
  const content = <>
    <section className="about-us-section">
        <div className="introduction">
          <h1>About Skill Lifter</h1>
          <p>Welcome to Skill Lifter, your trusted destination for online learning and skill development! For over four years, we've been dedicated to empowering individuals like you to unlock their full potential and achieve their goals through high-quality online courses.</p>
          <button className="btn btn-primary">Learn More</button>
        </div>
        <div>
          <img src={image} alt="picture of man" />
        </div>
        
        
      </section>
      <div className="mission-section">
        <div>
          <img src={missionImage} alt="mission-image" />
        </div>
      <div className="mission">
          <h1 className='text-xl'>Our Mission</h1>
          <p>At Skill Lifter, our mission is simple yet profound: to democratize education and make learning accessible to everyone, regardless of their background or location. We believe that education is the key to personal and professional growth, and we're committed to providing learners with the tools and resources they need to succeed in today's rapidly evolving world.</p>
        </div>
      </div>
  </>
  return content
}
