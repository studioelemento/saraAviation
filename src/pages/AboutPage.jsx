import React from "react"; 
import AviationCourses from "./home/components/AviationCourse";
import AirlinePartners from "./home/components/AirlinePartners";
import { LatestNews } from "./home/components/LatestNews";

const AboutPage = () => (
  <div className="pt-32 pb-20 container mx-auto text-center">
    <AviationCourses/>
    <AirlinePartners/>

    </div>
); 

export default AboutPage;
