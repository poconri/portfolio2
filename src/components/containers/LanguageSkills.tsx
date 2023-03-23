import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getLanguageskills } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
import { ProgressBar } from "../elements";
import { SkillData } from "./TechSkills";

export const BURNDATA: SkillData[] = [
  {
    id: 1,
    skill: {
      title: "HTML5",
      percentage: 96,
    },
  },
  {
    id: 2,
    skill: {
      title: "CSS3",
      percentage: 90,
    },
  },
  {
    id: 3,
    skill: {
      title: "JavaScript",
      percentage: 85,
    },
  },
  {
    id: 4,
    skill: {
      title: "React",
      percentage: 90,
    },
  },
  {
    id: 5,
    skill: {
      title: "Next.js",
      percentage: 60,
    },
  },
  {
    id: 8,
    skill: {
      title: "TypeScript",
      percentage: 80,
    },
  },
  {
    id: 10,
    skill: {
      title: "Python",
      percentage: 20,
    },
  },
];

const LanguageSkills = () => {
  // const { data } = useQuery("language-skills", getLanguageskills);

  // if (!data) return null;

  return (
    <div className="grid grid-cols-2 gap-7">
      {BURNDATA?.map((skillData, index: any) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
          className="col-span-2 md:col-span-1"
          key={skillData.id}
        >
          <ProgressBar skill={skillData.skill} />
        </motion.div>
      ))}
    </div>
  );
};

export default LanguageSkills;
