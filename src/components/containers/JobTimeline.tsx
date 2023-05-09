import { motion } from "framer-motion";
import { RiBriefcaseLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { getJobExperience } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
import { TimelineItem } from "../elements";
import { TimelineData } from "./EducationTimeline";

const BURNDATA: TimelineData[] = [
  {
    id: 2,
    timeline: {
      title: "Web Developer",
      meta: "Startrack S.A",
      text: "I mainly work with React with typescript, in a large GPS tracking project, where I have to develop new features and maintain the existing ones. Working with mobx",
      year: "June 2022 - Currently",
    },
  },
  {
    id: 1,
    timeline: {
      title: "Front-end web Developer",
      meta: "Unenmo",
      text: "I worked with Vue.js and mostly CSS. It was a business card business project, coding pixel perfect designs.",
      year: "Dec 2021 - May 2022",
    },
  },
  {
    id: 0,
    timeline: {
      title: "WFM Lead",
      meta: "247.ai",
      text: `Development and enhancement of real-time
      reports using data analysis techniques and
      communication with operations teams and
      clients.
      Construction of schedules, forecasts, and
      projections using programming algorithms
      and techniques.
      Implementation of accrual accounting and
      payroll processing, including calculating
      worked hours and bonus metrics.`,
      year: "Sept 2018 - June 2022",
    },
  },
];

const JobTimeline = () => {
  // const { data } = useQuery("job-experience", getJobExperience);

  // if (!data) return null;

  return (
    <div className="job-experience">
      <h4>
        <RiBriefcaseLine className="mr-2 inline-block text-primary" />
        Working Experience
      </h4>
      {BURNDATA?.map((timelineData, index) => (
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
