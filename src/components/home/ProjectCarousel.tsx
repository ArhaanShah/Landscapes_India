import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../index.css";


import ap1 from "../../content/projects/arpanbhai/ap1_lg.webp";
import av2 from "../../content/projects/arvind_uplands/av2_lg.webp";
import j1 from "../../content/projects/jay_baug/j1_lg.webp";
import rv4 from "../../content/projects/ramvatika/rv4_lg.webp";
import t1 from "../../content/projects/tej/t1_lg.webp";

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
    const [isMobile, setIsMobile] = useState<boolean>(typeof window !== "undefined" ? window.innerWidth < 768 : false);
    const [isScrolling, setIsScrolling] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px" });

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", onResize);

        let scrollTimeout: ReturnType<typeof setTimeout> | undefined;
        const handleScroll = () => {
            setIsScrolling(true);
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                setIsScrolling(false);
            }, 100);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, []);

    useEffect(() => {
        if (!isInView) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                setActiveIndex((prev) => Math.max(0, prev - 1));
            } else if (e.key === "ArrowRight") {
                setActiveIndex((prev) => Math.min(projects.length - 1, prev + 1));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isInView]);

    const handleProjectClick = (index: number) => {
        setActiveIndex(index);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveIndex((prev) => Math.min(projects.length - 1, prev + 1));
    };

    return (
        <section ref={containerRef} className="py-20 bg-dark-spruce overflow-visible" id="projects">
            <div className="text-center mb-12 px-6">
                <h2 className="font-serif text-4xl font-semibold text-eggshell-white mb-2">Featured Projects</h2>
                <p className="font-sans text-dusty-olive text-lg">A glimpse into our recent work.</p>
            </div>

            <div className="flex justify-center items-center h-[550px] md:h-[650px] relative w-full">
                <div
                    className="flex items-center justify-center relative w-full max-w-5xl h-full"
                    /*style={{
                        
                        perspective: "1500px",
                        transformStyle: "preserve-3d",
                    }}*/
                >
                    {projects.map((project, index) => {
                        const isActive = index === activeIndex;
                        const distance = Math.abs(index - activeIndex);
                        const offset = index - activeIndex;

                        if (isMobile && distance > 1) return null;

                        return (
                            <motion.div
                                key={project.id}
                                className={`absolute w-[400px] h-[400px] md:w-[520px] md:h-[520px] rounded-3xl overflow-hidden ${isScrolling ? "" : "glass-base glass-sheen"
                                    }`}
                                onClick={() => !isActive && handleProjectClick(index)}
                                initial={false}
                                animate={{
                                    scale: isActive ? 1.0 : 0.75,
                                    opacity: isActive ? 1 : 0.65,
                                    x: offset * (isMobile ? 60 : 160),
                                    rotateY: isActive ? 0 : offset * -18,
                                    z: isActive ? 100 : -distance * 10,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                style={{
                                    transformStyle: "flat",
                                    transformOrigin: "50% 50%",
                                    willChange: "transform, opacity",
                                    cursor: "pointer",
                                    pointerEvents: "auto",
                                    zIndex: isActive ? 700 : 50 - distance,
                                    position: "absolute",

                                    border: isScrolling ? "2.5px solid rgba(255, 255, 255, 0.1)" : "2.5px solid rgba(255, 255, 255, 0.25)",
                                    boxShadow: isScrolling
                                        ? "none"
                                        : (isActive
                                            ? "0 30px 70px rgba(0,0,0,0.3)"
                                            : "0 20px 50px rgba(0,0,0,0.2)"),
                                }}
                            >
                                <div className="w-full h-full relative group">
                                    <img
                                        src={project.image}
                                        alt={`${project.title} - ${project.category} project showcasing ${project.outcome}`}
                                        className={`w-full h-full object-cover transition-all duration-700 ease-in-out`}
                                        loading="lazy"
                                        decoding="async"
                                        style={{
                                            // Force GPU acceleration for image
                                            //transform: "translate3d(0,0,0)",
                                            backfaceVisibility: "hidden",
                                        }}
                                    />

                                    {isActive && (
                                        <>
                                            {index > 0 && (
                                                <button
                                                    onClick={handlePrev}
                                                    className="absolute top-4 left-4 z-50 p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 text-white transition-all duration-300 shadow-lg group/nav"
                                                    aria-label="Previous project"
                                                >
                                                    <ChevronLeft className="w-6 h-6 group-hover/nav:-translate-x-0.5 transition-transform" />
                                                </button>
                                            )}
                                            {index < projects.length - 1 && (
                                                <button
                                                    onClick={handleNext}
                                                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 text-white transition-all duration-300 shadow-lg group/nav"
                                                    aria-label="Next project"
                                                >
                                                    <ChevronRight className="w-6 h-6 group-hover/nav:translate-x-0.5 transition-transform" />
                                                </button>
                                            )}
                                        </>
                                    )}

                                    <div
                                        className={`absolute bottom-0 left-0 right-0 m-4 p-5 rounded-2xl text-white flex justify-between items-end transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                                        style={{
                                            background: isScrolling ? "rgba(0, 0, 0, 0.55)" : "rgba(20, 24, 28, 0.35)",
                                            border: isScrolling ? "none" : "1px solid rgba(255, 255, 255, 0.28)",
                                            boxShadow: isScrolling ? "none" : "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.18)",
                                            backdropFilter: isScrolling ? "blur(6px)" : "saturate(120%) blur(10px)",
                                            WebkitBackdropFilter: isScrolling ? "blur(6px)" : "saturate(120%) blur(10px)",
                                        }}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <span className="font-sans text-xs uppercase tracking-widest text-white/80 font-medium">{project.category}</span>
                                            <h3 className="font-serif text-xl md:text-2xl leading-tight text-white/100 font-semibold drop-shadow-lg">{project.title}</h3>
                                            <p className="font-sans text-xs md:text-sm text-white/95 mt-1 drop-shadow-md">{project.outcome}</p>
                                        </div>
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

