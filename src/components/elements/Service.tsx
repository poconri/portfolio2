import { ReactSVG } from "react-svg";

export interface ServiceProps {
  service: {
    title: string;
    text: string;
    icon: React.ReactNode;
  };
}

const Service = ({ service: { title, text, icon } }: ServiceProps) => {
  const renderIcon = () => icon;
  return (
    <div className="service card hovercard relative overflow-hidden p-4 md:p-5">
      <span className="service-icon mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-primary bg-opacity-10 p-5 text-4xl text-primary">
        {renderIcon()}
      </span>
      <h5>{title}</h5>
      <p>{text}</p>
    </div>
  );
};

export default Service;
