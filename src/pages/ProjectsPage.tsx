import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import { projects } from '../data/projects';
import { Link } from 'react-router-dom';

const FeaturedHoverCard: React.FC = () => {
    const sampleProject = projects[0];
    const titleWords = 'Synthetic Silhouette'.split(' ');
    const cardRef = useRef<HTMLDivElement | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const cardPaths = Array.from(card.querySelectorAll<SVGPathElement>('.sample-svg-stroke path'));
        const cardTitleWords = Array.from(card.querySelectorAll<HTMLElement>('.sample-title-word'));

        gsap.set(cardTitleWords, { yPercent: 100 });

        cardPaths.forEach((path) => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${length}`;
        });

        const playEnterAnimation = () => {
            timelineRef.current?.kill();
            const tl = gsap.timeline();

            cardPaths.forEach((path) => {
                tl.to(
                    path,
                    {
                        strokeDashoffset: 0,
                        attr: { 'stroke-width': 700 },
                        duration: 1.5,
                        ease: 'power2.out',
                    },
                    0
                );
            });

            tl.to(
                cardTitleWords,
                {
                    yPercent: 0,
                    duration: 0.75,
                    ease: 'power3.out',
                    stagger: 0.075,
                },
                0.35
            );

            timelineRef.current = tl;
        };

        const playLeaveAnimation = () => {
            timelineRef.current?.kill();
            const tl = gsap.timeline();

            cardPaths.forEach((path) => {
                const length = path.getTotalLength();
                tl.to(
                    path,
                    {
                        strokeDashoffset: length,
                        attr: { 'stroke-width': 200 },
                        duration: 1,
                        ease: 'power2.out',
                    },
                    0
                );
            });

            tl.to(
                cardTitleWords,
                {
                    yPercent: 100,
                    duration: 0.5,
                    ease: 'power3.out',
                    stagger: { each: 0.05, from: 'end' },
                },
                0
            );

            timelineRef.current = tl;
        };

        card.addEventListener('mouseenter', playEnterAnimation);
        card.addEventListener('mouseleave', playLeaveAnimation);
        card.addEventListener('focusin', playEnterAnimation);
        card.addEventListener('focusout', playLeaveAnimation);

        return () => {
            timelineRef.current?.kill();
            card.removeEventListener('mouseenter', playEnterAnimation);
            card.removeEventListener('mouseleave', playLeaveAnimation);
            card.removeEventListener('focusin', playEnterAnimation);
            card.removeEventListener('focusout', playLeaveAnimation);
        };
    }, []);

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-7xl mx-auto mb-20"
        >
            <div
                ref={cardRef}
                tabIndex={0}
                className="group relative aspect-square w-full max-w-3xl overflow-hidden rounded-sm md:aspect-[16/10]"
            >
                <img
                    src={sampleProject.imageUrl}
                    alt={sampleProject.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-eggshell-white/10" />

                <div
                    aria-hidden="true"
                    className="sample-svg-stroke pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-150  text-tomato-red/100"
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
                    className="sample-svg-stroke pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-150 text-white/100"
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

                {/* <div className="absolute inset-0 bg-gradient-to-t from-eggshell-white/85 via-eggshell-white/15 to-transparent" /> */}

                <h2
                    aria-label="Synthetic Silhouette"
                    className="absolute bottom-6 left-6 flex flex-wrap gap-x-3 font-serif text-3xl font-semibold leading-tight text-dark-spruce md:bottom-10 md:left-10 md:text-5xl"
                >
                    {titleWords.map((word) => (
                        <span key={word} aria-hidden="true" className="inline-block overflow-hidden pb-1">
                            <span className="sample-title-word inline-block">
                                {word}
                            </span>
                        </span>
                    ))}
                </h2>
            </div>
        </motion.section>
    );
};

const ProjectsPage: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

                <FeaturedHoverCard />

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-24">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`group flex flex-col ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
                        >
                            <Link
                                to={`/projects/${project.id}`}
                                className="relative overflow-hidden rounded-sm aspect-[4/3] mb-6 cursor-pointer block"
                            >
                                <div className="absolute inset-0 bg-dark-spruce/0 group-hover:bg-dark-spruce/10 transition-colors duration-500 z-10" />
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                    loading="lazy"
                                />
                            </Link>

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
                                    className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-dark-spruce/20 text-dark-spruce group-hover:bg-dark-spruce group-hover:text-white group-hover:border-dark-spruce transition-all duration-300"
                                >
                                    <ArrowUpRight size={20} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProjectsPage;
