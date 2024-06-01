


export default function Testimonial({ name, context, role }) {
  return (
    <div className="testimonial-card">
      <p className="testimonial-content">{context}</p>
      <div className="testimonial-info">
        <p className="testimonial-name">{name}</p>
        <p className="testimonial-role">({role})</p>
      </div>
    </div>
  );
}


export const WhyUsCard = ({title, description})=> {
  const content = (
    <div className="why-us-card">
      <p className="text-xl">{title}</p>
      <p>{description}</p>
    </div>
  )
  return content;
}
