import Head from "next/head";
import { Element as Section } from "react-scroll";
import {
  AboutSection,
  BlogSection,
  ContactSection,
  HeroSection,
  ResumeSection,
  ServicesSection,
  SkillsSection,
} from "../components/containers";
import { Layout } from "../components/layout";
import { SectionHeading } from "../components/utils";
import { Post } from "../lib/blogging";
import { useEffect } from "react";
import { track } from "@vercel/analytics/react";

const Homepage = ({ posts }: { posts: Post[] }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            track("section_view", {
              section_name: entry.target.id,
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Ramón Pocón - React Personal Portfolio</title>
      </Head>

      {/* Start Hero Section */}
      <Section name="section-home" id="section-home">
        <HeroSection blurred />
      </Section>
      {/* End Hero Section */}

      {/* Start About Section */}
      <Section
        name="section-about"
        id="section-about"
        className="about-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading animated={false} title="About Me" watermark="About" />
          <AboutSection />
        </div>
      </Section>
      {/* End About Section */}

      {/* Start Skills Section */}
      <Section
        name="section-skills"
        id="section-skills"
        className="skills-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            animated={false}
            title="My Skills"
            watermark="Skills"
          />
          <SkillsSection />
        </div>
      </Section>
      {/* End Skills Section */}

      {/* Start Service Section */}
      <Section
        name="section-service"
        id="section-service"
        className="services-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            animated={false}
            title="My Services"
            watermark="Services"
          />
          <ServicesSection />
        </div>
      </Section>
      {/* End Service Section */}

      {/* Start Resume Section */}
      <Section
        name="section-resume"
        id="section-resume"
        className="resume-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            animated={false}
            title="My Resume"
            watermark="Resume"
          />
          <ResumeSection />
        </div>
      </Section>
      {/* End Resume Section */}

      {/* Start Portfolios Section */}
      {/* <Section
        name="section-portfolios"
        className="pt-24 portfolios-section lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading animated={false} title="My Works" watermark="Works" />
          <PortfoliosSection />
        </div>
      </Section> */}
      {/* End Portfolios Section */}

      {/* Start Reviews Section */}
      {/* <Section
        name="section-reviews"
        className="pt-24 reviews-section lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            animated={false}
            title="Client Reviews"
            watermark="Reviews"
          />
          <ReviewsSection />
        </div>
      </Section> */}
      {/* End Reviews Section */}

      {/* Start Blog Section */}
      <Section
        name="section-blog"
        id="section-blog"
        className="news-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            title="Latest Blogs"
            watermark="Blogs"
            animated={false}
          />
          <BlogSection posts={posts} />
        </div>
      </Section>
      {/* End Blog Section */}

      {/* Start Contact Section */}
      <Section
        name="section-contact"
        id="section-contact"
        className="contact-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            animated={false}
            title="Contact Me"
            watermark="Contact"
          />
          <ContactSection />
        </div>
      </Section>
      {/* End Contact Section */}

      <span className="block pb-24 lg:pb-28 xl:pb-32"></span>
    </Layout>
  );
};

export default Homepage;
