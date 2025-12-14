import React from "react";
import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import ValueStrip from "../components/home/ValueStrip";
import ProjectCarousel from "../components/home/ProjectCarousel";
import ProcessTimeline from "../components/home/ProcessTimeline";
import BeforeAfterSlider from "../components/home/BeforeAfterSlider";
import Testimonials from "../components/home/Testimonials";
import LeadMagnet from "../components/home/LeadMagnet";
import Footer from "../components/home/Footer";

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-eggshell-white text-dark-spruce font-sans">
            <Navbar />
            <Hero />
            <ValueStrip />
            <ProjectCarousel />
            <ProcessTimeline />
            <BeforeAfterSlider />
            <Testimonials />
            <LeadMagnet />
            <Footer />
        </div>
    );
};

export default LandingPage;
