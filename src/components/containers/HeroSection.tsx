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

  if (!data) {
    return (
      <div className="herosection relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="herosection-content w-full py-20 text-center md:w-3/4">
          <div
            className="mb-5 inline-block rounded-full bg-gray-300"
            style={{ height: 150, width: 150 }}
          />
          <div className="mx-auto my-4 h-8 w-1/2 rounded bg-gray-300" />
          <div className="mx-auto my-2 h-4 w-1/3 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="herosection relative overflow-hidden">
      {!blurred && (
        <div className="herosection-bg absolute top-0 left-0 h-full w-full"></div>
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
                <span className="herosection-imageanimation absolute top-0 left-0 z-10 h-full w-full animate-spin rounded-full bg-gradient-to-tr from-primary to-transparent"></span>
                <div className="herosection-image fiximage relative z-20 inline-block h-[150px] w-[150px] overflow-hidden rounded-full border-6 border-primary border-opacity-10 align-middle">
                  <Image
                    loader={imageLoader}
                    unoptimized
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
                className="lead mb-0"
              >
                {data.bio}
              </motion.p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
                variants={childrenAnimation}
                className="herosection-socialicons mt-7 text-center"
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
