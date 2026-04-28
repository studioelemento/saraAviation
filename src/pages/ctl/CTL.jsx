import React from "react";
import CTLHero from "./components/CTLHero";
import FoundationSection from "./components/FoundationSession";
import PathwaysSection from "./components/PathwaySection";
import CareerFormSection from "./components/CareerFormSection";
import ProgramPhases from "./components/ProgramPhases";

const CTL = () => {
  return (
    <div>
      <CTLHero />
      <FoundationSection />
      <PathwaysSection/>
      <CareerFormSection/>
      <ProgramPhases/>
    </div>
  );
};

export default CTL;
