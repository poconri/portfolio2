import { motion } from "framer-motion";
import { RiBriefcaseLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { getJobExperience } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
import { TimelineItem } from "../elements";
import { TimelineData } from "./EducationTimeline";

const JobTimeline = () => {
  const { data } = useQuery<TimelineData[]>("job-experience", getJobExperience);

  if (!data) return null;

  return (
    <div className="job-experience">
      <h4>
        <RiBriefcaseLine className="mr-2 inline-block text-primary" />
        Working Experience
      </h4>
      {data?.map((timelineData, index) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
          className="timeline-wrap"
          key={timelineData.id}
        >
          <TimelineItem timeline={timelineData.timeline} />
        </motion.div>
      ))}
    </div>
  );
};

export default JobTimeline;
