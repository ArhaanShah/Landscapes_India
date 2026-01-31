import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import { projects } from '../data/projects';
import { Link } from 'react-router-dom';

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
                            <div className="relative overflow-hidden rounded-sm aspect-[4/3] mb-6 cursor-pointer">
                                <div className="absolute inset-0 bg-dark-spruce/0 group-hover:bg-dark-spruce/10 transition-colors duration-500 z-10" />
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                    loading="lazy"
                                />
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
                                    to="#"
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
