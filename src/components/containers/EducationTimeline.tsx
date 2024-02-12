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

const EducationTimeline = () => {
  const { data } = useQuery<TimelineData[]>(
    "education-background",
    getEducationBackground
  );

  if (!data) return null;

  return (
    <div className="education-timeline">
      <h4>
        <RiBookLine className="mr-2 inline-block text-primary" />
        Educational Qualification
      </h4>
      {data?.map((dataTimeline, index) => (
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
