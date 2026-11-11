import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import { Link } from 'react-router-dom';
import ContentImage from '../components/ContentImage';

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const cardRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const cardPaths = Array.from(card.querySelectorAll<SVGPathElement>('.project-svg-stroke path'));
        const lengths = cardPaths.map(path => path.getTotalLength());
        const context = gsap.context(() => {
            cardPaths.forEach((path, index) => {
                gsap.set(path, { strokeDasharray: lengths[index], strokeDashoffset: lengths[index], attr: { 'stroke-width': 200 } });
            });
            // Reveal the layers only after their strokes are initialized.
            gsap.set('.project-svg-stroke', { opacity: 1 });
        }, card);
        let tween: gsap.core.Tween | undefined;
        const enter = () => {
            tween?.kill();
            tween = gsap.to(cardPaths, {
                strokeDashoffset: 0,
                attr: { 'stroke-width': 700 },
                duration: 1.5,
                ease: 'power2.out',
            });
        };
        const withdraw = () => {
            tween?.kill();
            tween = gsap.to(cardPaths, {
                strokeDashoffset: (index: number) => lengths[index],
                attr: { 'stroke-width': 200 },
                duration: 1,
                ease: 'power2.out',
            });
        };
        const leave = () => { if (!card.contains(document.activeElement)) withdraw(); };
        const blur = (event: FocusEvent) => {
            if (!card.matches(':hover') && !card.contains(event.relatedTarget as Node | null)) withdraw();
        };
        card.addEventListener('mouseenter', enter);
        card.addEventListener('mouseleave', leave);
        card.addEventListener('focusin', enter);
        card.addEventListener('focusout', blur);
        if (card.matches(':hover') || card.contains(document.activeElement)) enter();

        return () => {
            card.removeEventListener('mouseenter', enter);
            card.removeEventListener('mouseleave', leave);
            card.removeEventListener('focusin', enter);
            card.removeEventListener('focusout', blur);
            tween?.kill();
            context.revert();
        };
    }, []);

    const secondSvgColor = project.secondSvgColor || 'text-dark-spruce';

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`group flex flex-col ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
        >
            <div
                ref={cardRef}
                className="group/project relative overflow-hidden rounded-sm aspect-[4/3] mb-6 cursor-pointer"
            >
                <Link
                    to={`/projects/${project.id}`}
                    className="block h-full w-full"
                >
                    <div className="project-hover-overlay pointer-events-none absolute inset-0 bg-dark-spruce/0 group-hover/project:bg-dark-spruce/100 group-focus-within/project:bg-dark-spruce/100 transition-colors duration-1000 z-10" />
                    <ContentImage
                        src={project.imageUrl}
                        alt={project.title}
                        className="project-hover-image w-full h-full object-cover group-hover/project:scale-105 group-focus-within/project:scale-105 transition-transform duration-700 ease-out"
                        loading={index < 2 ? 'eager' : 'lazy'}
                    />

                    <div
                        aria-hidden="true"
                        className={`project-svg-stroke opacity-0 z-20 pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-150 ${secondSvgColor}`}
                    >
                        <svg width="2250" height="2535" viewBox="0 0 2250 2535" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                            <path
                                d="M1661.28 2255.51C1661.28 2255.51 2311.09 1960.37 2111.78 1817.01C1944.47 1696.67 718.456 2870.17 499.781 2255.51C308.969 1719.17 2457.51 1613.83 2111.78 963.512C1766.05 313.198 427.949 2195.17 132.281 1455.51C-155.219 736.292 2014.78 891.514 1708.78 252.012C1437.81 -314.29 369.471 909.169 132.281 566.512C18.1772 401.672 244.781 193.012 244.781 193.012"
                                stroke="currentColor"
                                strokeWidth="200"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <div
                        aria-hidden="true"
                        className="project-svg-stroke opacity-0 z-20 pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-[1.6] text-eggshell-white/100"
                    >
                        <svg width="2453" height="2273" viewBox="0 0 2453 2273" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                            <path
                                d="M227.549 1818.76C227.549 1818.76 406.016 2207.75 569.049 2130.26C843.431 1999.85 -264.104 1002.3 227.549 876.262C552.918 792.849 773.647 2456.11 1342.05 2130.26C1885.43 1818.76 14.9644 455.772 760.548 137.262C1342.05 -111.152 1663.5 2266.35 2209.55 1972.76C2755.6 1679.18 1536.63 384.467 1826.55 137.262C2013.5 -22.1463 2209.55 381.262 2209.55 381.262"
                                stroke="currentColor"
                                strokeWidth="200"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </Link>
            </div>

            <div className="flex justify-between items-start border-t border-dark-spruce/20 pt-6">
                <div>
                    <h3 className="font-serif text-3xl text-dark-spruce mb-2 group-hover:text-dusty-olive transition-colors duration-300">
                        {project.title}
                    </h3>
                    <p className="font-inter text-sm font-medium text-tomato-red mb-3 uppercase tracking-wider">
                        {project.category} — {project.location}
                    </p>
                    <p className="font-inter text-dark-spruce/60 leading-relaxed max-w-md">
                        {project.description}
                    </p>
                </div>

                <Link
                    to={`/projects/${project.id}`}
                    aria-label={`View ${project.title}`}
                    className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-dark-spruce/20 text-dark-spruce group-hover:bg-dark-spruce group-hover:text-white group-hover:border-dark-spruce transition-all duration-300"
                >
                    <ArrowUpRight size={20} />
                </Link>
            </div>
        </motion.div>
    );
};

const ProjectsPage: React.FC = () => {
    return (
        <div className="bg-eggshell-white min-h-screen flex flex-col">
            <Navbar alwaysShown={true} />

            <main className="flex-grow pt-32 pb-20 px-6 md:px-12 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-7xl mx-auto mb-20 text-center md:text-left"
                >
                    <h1 className="font-serif text-5xl md:text-7xl text-dark-spruce mb-6 leading-tight">
                        Our <span className="italic text-dusty-olive">Portfolio</span>
                    </h1>
                    <p className="font-inter text-lg text-dark-spruce/70 max-w-2xl leading-relaxed">
                        Discover a curated collection of our finest landscapes, where nature meets architectural elegance. Each project is a testament to our commitment to sustainable and inspiring design.
                    </p>
                </motion.div>

                {/* <FeaturedHoverCard /> */}

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-24">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProjectsPage;
