
import Hero from "@/src/shared/sections/Hero";
import Services from "@/src/shared/sections/Services";
import CTA from "@/src/shared/sections/CTA";
import WhyChooseUs from "@/src/shared/sections/whyChooseUs";
import Doctors from "@/src/shared/sections/Doctors";



export default function Home() {
  return (
    <>
      
      <Hero />
      <Services />
      <Doctors/>
      <WhyChooseUs/>
      <CTA />
     
    </>
  );
}