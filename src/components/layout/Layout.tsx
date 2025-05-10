import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Scroll from "react-scroll";
import Footer from "./Footer";
import Header from "./Header";
import { RiArrowUpSLine } from "react-icons/ri";
import useEventListener from "../../hooks/useEventListener";
import { track } from "@vercel/analytics/react";
import { debounce} from 'lodash'

interface LayoutProps {
  children: React.ReactNode;
  blurred?: boolean;
}

const Layout = ({ children, blurred }: LayoutProps) => {
  const [backToTop, setBackToTop] = useState(false);
  const [startTime] = useState(Date.now());

  const scroll = Scroll.animateScroll;

  const isVisible = () => {
    const scrollTop = window.scrollY;
    scrollTop > 500 ? setBackToTop(true) : setBackToTop(false);
  };

  useEventListener("scroll", isVisible);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      track("scroll_depth", { depth: Math.round(scrollPercent) });

    },1000);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      track("time_spent", { seconds: timeSpent });
    }, 30000);

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      track("page_exit", {
        time_spent_seconds: timeSpent,
        url: window.location.pathname,
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [startTime]);

  return (
    <div
      className={`wrapper relative min-h-screen w-full bg-grey ${
        blurred ? "blurredBg" : ""
      }`}
    >
      <Header />
      <main
        className={`page-content relative bg-grey bg-opacity-95 ${
          blurred ? "backdrop-blur-lg backdrop-filter" : ""
        }`}
      >
        <div className="bglines fixed top-0 left-0 z-20 flex h-screen w-full justify-around">
          <span className="border-r border-white border-opacity-5"></span>
          <span className="border-r border-white border-opacity-5"></span>
          <span className="border-r border-white border-opacity-5"></span>
          <span className="border-r border-white border-opacity-5"></span>
          <span className="border-r border-white border-opacity-5"></span>
        </div>
        <div className="sitedata relative z-30 min-h-screen">{children}</div>
      </main>
      <Footer />
      <motion.button
        initial={{
          opacity: 0,
          x: 1000,
        }}
        animate={{
          opacity: backToTop ? 1 : 0,
          x: backToTop ? 0 : 1000,
        }}
        className="btn fixed bottom-12 left-auto top-auto right-7 z-30 rounded-full p-2.5 text-xl"
        onClick={() => {
          scroll.scrollToTop();
          track("back_to_top_clicked");
        }}
      >
        <RiArrowUpSLine />
      </motion.button>
    </div>
  );
};

export default Layout;
