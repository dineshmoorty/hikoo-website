import About from "@/components/home/about/About";
import ContactCTA from "@/components/home/contact-cta/Contact";
import Hero from "@/components/home/hero/Hero";
import Internship from "@/components/home/internship/Internship";
import Services from "@/components/home/services/Services";
import Technologies from "@/components/home/technologies/Technologies";
import WhyChooseUs from "@/components/home/why-choose-us/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Technologies />
      <Internship />
      <ContactCTA />
    </>
  );
}