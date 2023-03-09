import Image from "next/image";
import { imageLoader, shimmer, toBase64 } from "../../lib/utils";
import { motion } from "framer-motion";
import { childrenAnimation } from "../../lib/motion";
import { getInformation } from "../../fetchers";
import { useQuery } from "react-query";
import photo from "../../assets/photo.jpg";

const BURNDATA = {
  largeImage: photo,
  fullName: "Ramon Pocón",
  firstName: "Ramon",
  lastName: "Pocón",
  age: 33,
  nationality: "Guatemalan",
  location: "Guatemala City, Guatemala",
  languages: ["Spanish", "English"],
  address: null,
  freelance: null,
};

const AboutSection = () => {
  // const { data } = useQuery("information", getInformation);

  // if (!data) return null;

  return (
    <div className="grid grid-cols-2 items-center gap-7">
      <div className="col-span-2 lg:col-span-1">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          variants={childrenAnimation}
          className="about-image overflow-hidden rounded-lg"
        >
          <div className="about-image-inner fiximage relative border-10 border-primary border-opacity-20">
            <span className="absolute -top-2.5 left-0 z-10 h-2.5 w-10 animate-ledgerleftright rounded-full bg-gradient-to-r from-transparent to-primary"></span>
            <span className="absolute top-auto -bottom-2.5 left-auto z-10 h-2.5 w-10 animate-ledgerrightleft rounded-full bg-gradient-to-r from-primary to-transparent"></span>
            <span className="absolute -left-2.5 top-auto z-10 h-10 w-2.5 animate-ledgerbottomtop rounded-full bg-gradient-to-t from-transparent to-primary"></span>
            <span className="absolute left-auto -right-2.5 z-10 h-10 w-2.5 animate-ledgertopbottom rounded-full bg-gradient-to-b from-transparent to-primary"></span>
            <Image
              loader={imageLoader}
              unoptimized={true}
              src={BURNDATA.largeImage}
              height={422}
              width={660}
              layout="responsive"
              alt={BURNDATA.fullName}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(660, 422)
              )}`}
            />
          </div>
        </motion.div>
      </div>
      <div className="col-span-2 lg:col-span-1">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          variants={childrenAnimation}
          className="about-content"
        >
          <h3>
            Hi, I am <span className="text-primary">{BURNDATA.fullName}</span>
          </h3>
          <ul className="styledlist">
            {BURNDATA.firstName && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  First Name{" "}
                </strong>
                : {BURNDATA.firstName}
              </li>
            )}
            {BURNDATA.lastName && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Last Name{" "}
                </strong>
                : {BURNDATA.lastName}
              </li>
            )}
            {BURNDATA.age && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Age{" "}
                </strong>
                : {BURNDATA.age} years
              </li>
            )}
            {BURNDATA.nationality && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Nationality{" "}
                </strong>
                : {BURNDATA.nationality}
              </li>
            )}
            {BURNDATA.languages.length ? (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Languages{" "}
                </strong>
                : {BURNDATA.languages.join(", ")}
              </li>
            ) : null}
            {BURNDATA.address && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Address{" "}
                </strong>
                : {BURNDATA.address}
              </li>
            )}
            {BURNDATA.freelance && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Freelance{" "}
                </strong>
                : {BURNDATA.freelance}
              </li>
            )}
          </ul>
          <a href="/resume.pdf" className="btn mt-3">
            <span>Download Resume</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
