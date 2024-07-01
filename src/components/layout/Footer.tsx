import Link from "next/link";
import { useQuery } from "react-query";
import { getInformation } from "../../fetchers";
import { SocialIcons } from "../elements";

const BURNDATA = {
  socialAddress: {
    facebook: "https://www.facebook.com/ramon.ignacio.7",
    twitter: "https://twitter.com/kaozgt",
    github: "https://github.com/poconri",
    linkedin:
      "https://www.linkedin.com/in/ramon-ignacio-poc%C3%B3n-elias-23331738/",
  },
};

const Footer = () => {
  // const { data } = useQuery("information", getInformation);

  // if (!data) return null;

  return (
    <footer className="footer relative z-20 border-t border-white border-opacity-10 bg-grey bg-opacity-95 backdrop-blur backdrop-filter">
      <div className="container mx-auto">
        <div className="footer-content flex flex-wrap items-center justify-between gap-y-5 gap-x-7 py-5 text-center md:flex-nowrap">
          <div className="w-full md:w-auto">
            <SocialIcons data={BURNDATA.socialAddress} />
          </div>
          <p className="mb-0 w-full md:w-auto">
            &copy; {new Date().getFullYear()}, Built with ♥️ by
            <Link
              href="/homepage"
              className="pl-1.5 font-medium text-heading no-underline hover:text-primary"
            >
              Ramon Pocón
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
