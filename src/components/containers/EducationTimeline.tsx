import { motion } from "framer-motion";
import { RiBookLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { getEducationBackground } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
import { TimelineItem } from "../elements";
import { TimelineItemProps } from "../elements/TimelineItem";

export interface TimelineData extends TimelineItemProps {
  id: number;
}

const BURNDATA: TimelineData[] = [
  {
    id: 2,
    timeline: {
      title: "Computer Systems Engineering",
      meta: "Universidad Galileo Guatemala",
      text: " I'm currently stying computer systems engineer with experience in designing, developing and deploying complex systems for a variety of industries",
      year: "2023 - Currently",
    },
  },
  {
    id: 1,
    timeline: {
      title: "JavaScript Developer",
      meta: "Platzi",
      text: "My web development education at Platzi covered a wide range of topics, from the foundational concepts of HTML, CSS, and JavaScript, to the more complex tools and frameworks like React, TypeScript, and Redux.",
      year: "2019 - 2022",
    },
  },
];

const EducationTimeline = () => {
  // const { data } = useQuery("education-background", getEducationBackground);

  // if (!data) return null;

  return (
    <div className="education-timeline">
      <h4>
        <RiBookLine className="mr-2 inline-block text-primary" />
        Educational Qualification
      </h4>
      {BURNDATA?.map((dataTimeline, index) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
          className="timeline-wrap"
          key={dataTimeline.id}
        >
          <TimelineItem timeline={dataTimeline.timeline} />
        </motion.div>
      ))}
    </div>
  );
};

export default EducationTimeline;
