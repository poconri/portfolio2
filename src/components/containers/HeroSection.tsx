import Image from "next/image";
import { RiArrowDownLine } from "react-icons/ri";
import { Link } from "react-scroll";
import { SocialIcons } from "../elements";
import { imageLoader, shimmer, toBase64 } from "../../lib/utils";
import { motion } from "framer-motion";
import { childrenAnimation } from "../../lib/motion";
import { useQuery } from "react-query";
import { getInformation } from "../../fetchers";
import photo from "../../assets/photo.jpg";
import { TypeAnimation } from "react-type-animation";

interface HeroSectionProps {
  blurred?: boolean;
  scroll?: boolean;
  typed?: boolean;
}

const BURNDATA = {
  thumbImage: photo,
  fullName: "Ramon Pocón",
  bio: "I am an experienced full stack developer specializing in React and Typescript with a passion for collaborating with development teams and designers to create high-quality web products that exceed user expectations. I am passionate about web accessibility and performance optimization. If you're interested in working together, please don't hesitate to send me a message.",
  socialAddress: {
    facebook: "https://www.facebook.com/ramon.ignacio.7",
    twitter: "https://twitter.com/kaozgt",
    github: "https://github.com/poconri",
    linkedin:
      "https://www.linkedin.com/in/ramon-ignacio-poc%C3%B3n-elias-23331738/",
  },
};

const HeroSection = ({
  blurred,
  scroll = true,
  typed = true,
}: HeroSectionProps) => {
  // const { data } = useQuery("information", getInformation);

  // if(!data) return null;

  return (
    <div className="herosection relative overflow-hidden">
      {!blurred && (
        <div className="herosection-bg absolute left-0 top-0 h-full w-full"></div>
      )}
      <div
        className={`herosection-content relative z-20 bg-grey-darken  ${
          blurred ? "bg-opacity-20" : "bg-opacity-90"
        }`}
      >
        <div className="container relative mx-auto">
          <div className="flex min-h-screen w-full items-center justify-center">
            <div className="herosection-content w-full py-20 text-center md:w-3/4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                variants={childrenAnimation}
                className="herosection-imagewrapper relative mb-5 inline-block overflow-hidden rounded-full align-middle"
              >
                <span className="herosection-imageanimation absolute left-0 top-0 z-10 h-full w-full animate-spin rounded-full bg-gradient-to-tr from-primary to-transparent"></span>
                <div className="herosection-image fiximage relative z-20 inline-block h-[150px] w-[150px] overflow-hidden rounded-full border-6 border-primary border-opacity-10 align-middle">
                  <Image
                    loader={imageLoader}
                    unoptimized={true}
                    src={BURNDATA.thumbImage}
                    alt={BURNDATA.fullName}
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
                      BURNDATA.fullName,
                      1000,
                      "Frontend Developer",
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
                  // <ReactTyped
                  //   loop
                  //   typeSpeed={100}
                  //   backSpeed={20}
                  //   backDelay={2000}
                  //   strings={[
                  //     BURNDATA.fullName,
                  //     "Frontend Developer",
                  //     "Web Developer",
                  //     "Typescript enthusiast 🚀",
                  //   ]}
                  //   className="text-primary"
                  // />
                  <span className="text-primary">{BURNDATA.fullName}</span>
                )}
              </motion.h1>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                variants={childrenAnimation}
                className="lead mb-0"
              >
                {BURNDATA.bio}
              </motion.p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
                variants={childrenAnimation}
                className="herosection-socialicons mt-7 text-center"
              >
                <SocialIcons data={BURNDATA.socialAddress} />
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
              className="herosection-bottom absolute left-0 top-auto bottom-10 w-full justify-between text-center"
            >
              <Link
                activeClass="active"
                to="section-about"
                spy={true}
                smooth="easeInQuad"
                offset={-74}
                duration={1000}
                className="cursor-pointer text-xs font-medium uppercase tracking-widest transition-all hover:text-primary"
              >
                <RiArrowDownLine className="inline animate-bounce text-base" />
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
