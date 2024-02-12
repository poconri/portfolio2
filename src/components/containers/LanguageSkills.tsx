import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getLanguageskills } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
import { ProgressBar } from "../elements";
import { SkillData } from "./TechSkills";

const LanguageSkills = () => {
  const { data } = useQuery<SkillData[]>("language-skills", getLanguageskills);

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 gap-7">
      {data?.map((skillData, index: any) => (
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
