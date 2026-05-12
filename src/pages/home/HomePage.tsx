import React, { useEffect } from "react";
import ScorecardItems from "./ScorecardItems";
import Transformations from "./Transformations";
import Voices from "./Voices";
import AboutAndProcess from "./About";
import CTASection from "./CTASection";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";
import ClientVideoSection from "./ClientVideoSection";
import RadhikaVideo from "../../assets/radhika-cxo-story.mp4";
import RadhikaImage from "../../assets/radhika.jpeg";
import HowWeWork from "./HowWeWork";

const HomePage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    // small delay so sections are mounted
    const t = setTimeout(() => {
      document
        .querySelector(hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <main>
      <ScorecardItems />
      <section id="stories" className="scroll-mt-[80px]">
        <Transformations />
      </section>
      <section id="retreats" className="scroll-mt-[80px]">
        <CTASection />
      </section>
      <section id="endorsements" className="scroll-mt-[80px]">
        <Voices />
      </section>
      <section id="client-video" className="scroll-mt-[80px]">
        <ClientVideoSection
          src={RadhikaVideo}
          poster={RadhikaImage}
        />
      </section>
      <section>
        <HowWeWork />
      </section>
      <section id="about" className="scroll-mt-[80px]">
        <AboutAndProcess />
      </section>
      <Footer />
    </main>
  );
};

export default HomePage;
