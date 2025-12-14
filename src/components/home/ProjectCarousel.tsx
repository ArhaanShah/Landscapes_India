import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import ap1 from "../../content/images/projects/arpanbhai/ap1.jpg";
import av2 from "../../content/images/projects/arvind_uplands/av2.JPG";
import j1 from "../../content/images/projects/jay_baug/j1.JPG";
import rv4 from "../../content/images/projects/ramvatika/rv4.jpg";
import t1 from "../../content/images/projects/tej/t1.JPG";

const projects = [
    {
        id: 1,
        image: ap1,
        title: "Arpanbhai Residence",
        category: "Private Garden",
        outcome: "A quiet retreat nestled in nature.",
    },
    {
        id: 2,
        image: av2,
        title: "Arvind Uplands",
        category: "Community Park",
        outcome: "Bringing people together through open spaces.",
    },
    {
        id: 3,
        image: j1,
        title: "Jay Baug",
        category: "Farmhouse",
        outcome: "Expansive greens for weekend getaways.",
    },
    {
        id: 4,
        image: rv4,
        title: "Ramvatika",
        category: "Urban Landscape",
        outcome: "Modern serenity in the heart of the city.",
    },
    {
        id: 5,
        image: t1,
        title: "Tej Residence",
        category: "Courtyard",
        outcome: "Blending indoor and outdoor living.",
    },

];

const ProjectCarousel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(2);

    const handleProjectClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <section className="py-20 bg-eggshell-white overflow-hidden" id="projects">
            <div className="text-center mb-12 px-6">
                <h2 className="font-serif text-4xl font-semibold text-dark-spruce mb-2">Featured Projects</h2>
                <p className="font-sans text-dusty-olive text-lg">A glimpse into our recent work.</p>
            </div>

            <div className="flex justify-center items-center h-[500px] md:h-[600px] relative w-full">
                <div className="flex items-center justify-center relative w-full max-w-5xl h-full">
                    {projects.map((project, index) => {
                        const isActive = index === activeIndex;
                        const distance = Math.abs(index - activeIndex);

                        return (
                            <motion.div
                                key={project.id}
                                className={`absolute w-[300px] h-[450px] md:w-[400px] md:h-[550px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.2)] ${isActive ? "z-10" : ""
                                    }`}
                                onClick={() => handleProjectClick(index)}
                                initial={false}
                                animate={{
                                    scale: isActive ? 1.0 : 0.85,
                                    opacity: isActive ? 1 : 0.6,
                                    zIndex: isActive ? 10 : 10 - distance,
                                    x: (index - activeIndex) * (window.innerWidth < 768 ? 40 : 120),
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <div className="w-full h-full relative group">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${isActive ? "scale-105" : ""}`}
                                    />
                                    <div className={`absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#22442b]/95 to-transparent text-white flex justify-between items-end transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-sans text-xs uppercase tracking-widest text-ash-grey font-medium">{project.category}</span>
                                            <h3 className="font-serif text-2xl md:text-3xl leading-tight font-semibold">{project.title}</h3>
                                            <p className="font-sans text-sm text-white/80 mt-1">{project.outcome}</p>
                                        </div>
                                        <button className="bg-tomato-red text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                            <ArrowUpRight size={24} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProjectCarousel;
