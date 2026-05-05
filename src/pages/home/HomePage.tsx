import React from "react";
import ScorecardItems from "./ScorecardItems";
import Transformations from "./Transformations";
import Voices from "./Voices";
import AboutAndProcess from "./About";
import CTASection from "./CTASection";
import Footer from "../../components/Footer";

const HomePage : React.FC = () => {
  return (
    <main className="">
      <ScorecardItems />
      <Transformations />
      <Voices />
      <AboutAndProcess /> 
      <CTASection />
      <Footer />
    </main>
  );
}

export default HomePage;


