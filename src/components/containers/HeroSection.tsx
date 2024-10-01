import Image from "next/image";
import { RiArrowDownLine } from "react-icons/ri";
import { Link } from "react-scroll";
import { SocialIcons } from "../elements";
import { imageLoader, shimmer, toBase64 } from "../../lib/utils";
import { motion } from "framer-motion";
import { childrenAnimation } from "../../lib/motion";
import { useQuery } from "react-query";
import { getInformation } from "../../fetchers";
import photoWithBackground from "../../assets/photo-bg.jpg";
import { TypeAnimation } from "react-type-animation";

interface HeroSectionProps {
  blurred?: boolean;
  scroll?: boolean;
  typed?: boolean;
}

const HeroSection = ({
  blurred,
  scroll = true,
  typed = true,
}: HeroSectionProps) => {
  const { data } = useQuery("information", getInformation);

  if (!data) return null;

  return (
    <div className="relative overflow-hidden herosection">
      {!blurred && (
        <div className="absolute top-0 left-0 w-full h-full herosection-bg"></div>
      )}
      <div
        className={`herosection-content relative z-20 bg-grey-darken  ${
          blurred ? "bg-opacity-20" : "bg-opacity-90"
        }`}
      >
        <div className="container relative mx-auto">
          <div className="flex items-center justify-center w-full min-h-screen">
            <div className="w-full py-20 text-center herosection-content md:w-3/4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                variants={childrenAnimation}
                className="relative inline-block mb-5 overflow-hidden align-middle rounded-full herosection-imagewrapper"
              >
                <span className="absolute top-0 left-0 z-10 w-full h-full rounded-full herosection-imageanimation animate-spin bg-gradient-to-tr from-primary to-transparent"></span>
                <div className="herosection-image fiximage relative z-20 inline-block h-[150px] w-[150px] overflow-hidden rounded-full border-6 border-primary border-opacity-10 align-middle">
                  <Image
                    loader={imageLoader}
                    unoptimized={true}
                    src={photoWithBackground}
                    alt={data.fullName}
                    height={150}
                    width={150}
                    layout="responsive"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(150, 150)
                    )}`}
                  />
                </div>
              </motion.div>
              <motion.h1
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                variants={childrenAnimation}
                className="mb-5 text-heading"
              >
                <span className="block sm:inline">Hi, I am</span>{" "}
                {typed ? (
                  <TypeAnimation
                    sequence={[
                      data.fullName,
                      1000,
                      "full stack Developer",
                      1000,
                      "Web Developer",
                      1000,
                      "Typescript enthusiast 🚀",
                      1000,
                    ]}
                    wrapper="span"
                    className="text-primary"
                    speed={1}
                    deletionSpeed={1}
                    repeat={Infinity}
                  />
                ) : (
                  <span className="text-primary">{data``.fullName}</span>
                )}
              </motion.h1>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                variants={childrenAnimation}
                className="mb-0 lead"
              >
                {data.bio}
              </motion.p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
                variants={childrenAnimation}
                className="text-center herosection-socialicons mt-7"
              >
                <SocialIcons data={data.socialAddress} />
              </motion.div>
            </div>
          </div>
          {scroll ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1 }}
              variants={childrenAnimation}
              className="absolute left-0 top-auto justify-between w-full text-center herosection-bottom bottom-10"
            >
              <Link
                activeClass="active"
                to="section-about"
                spy={true}
                smooth="easeInQuad"
                offset={-74}
                duration={1000}
                className="text-xs font-medium tracking-widest uppercase transition-all cursor-pointer hover:text-primary"
              >
                <RiArrowDownLine className="inline text-base animate-bounce" />
                <span className="pl-2">Scroll Down</span>
              </Link>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
