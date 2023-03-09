import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getTechskills } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
import { ProgressCircle } from "../elements";
import { ProgressCircleProps } from "../elements/ProgressCircle";

export interface SkillData extends ProgressCircleProps {
  id: number;
}

const BURNDATA: SkillData[] = [
  {
    id: 1,
    skill: {
      title: "Front-end Development",
      percentage: 90,
    },
  },
  {
    id: 2,
    skill: {
      title: "Mobile App Development",
      percentage: 80,
    },
  },
];

const TechSkills = () => {
  // const { data } = useQuery("tech-skills", getTechskills);

  // if (!data) return null;

  return (
    <div className="grid grid-cols-4 gap-7">
      {BURNDATA?.map((skillData, index: number) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
          className="col-span-4 sm:col-span-2 lg:col-span-1"
          key={skillData.id}
        >
          <ProgressCircle skill={skillData.skill} />
        </motion.div>
      ))}
    </div>
  );
};

export default TechSkills;
