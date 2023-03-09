import { motion } from "framer-motion";
import { RiCodeSSlashLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { getServices } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
import { Service } from "../elements";
import { ServiceProps } from "../elements/Service";

export interface ServiceData extends ServiceProps {
  id: number;
}

const BURNDATA: ServiceData[] = [
  {
    id: 1,
    service: {
      title: "Front-end Development",
      text: " I specialize in creating responsive and user-friendly interfaces that meet the needs of modern web applications.",
      icon: "react-icons/ri/RiCodeSSlashLine",
    },
  },
  {
    id: 2,
    service: {
      title: "Mobile App Development",
      text: " I'm a mobile app developer with extensive experience in building native apps for iOS and Android using React Native.",
      icon: "react-icons/ri/RiMobileLine",
    },
  },
];

const ServicesSection = () => {
  // const { data } = useQuery("services", getServices);

  // if (!data) return null;

  return (
    <div className="services-wrapper grid grid-cols-3 gap-7">
      {BURNDATA?.map((data, index: number) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
          className="col-span-3 lg:col-span-1"
          key={data.id}
        >
          <Service service={data.service} />
        </motion.div>
      ))}
    </div>
  );
};

export default ServicesSection;
