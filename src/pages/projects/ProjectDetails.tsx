import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Ruler, Users } from 'lucide-react';
import Navbar from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';
import Dialog from '../../components/Dialog';
import { projects } from '../../data/projects';
import ContentImage from '../../components/ContentImage';

const ProjectDetails: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const project = projects.find((p) => p.id === projectId);

    if (!project) {
        return (
            <div className="bg-eggshell-white min-h-screen flex flex-col">
                <Navbar alwaysShown={true} />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="font-serif text-4xl text-dark-spruce mb-4">Project Not Found</h1>
                        <button
                            onClick={() => navigate('/projects')}
                            className="font-inter text-dusty-olive hover:text-dark-spruce transition-colors"
                        >
                            Back to Projects
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // Calculate grid layout for masonry-like gallery
    const getGridClass = (index: number) => {
        const total = project.galleryImages.length;
        
        // Create varied layouts based on image count
        if (total <= 3) return 'col-span-1 row-span-1';
        if (total <= 6) {
            if (index === 0) return 'col-span-1 sm:col-span-2 row-span-1';
            if (index === 1) return 'col-span-1';
            if (index === 2) return 'col-span-1';
            return 'col-span-1';
        }
        
        // For 7+ images
        if (index === 0) return 'col-span-1 sm:col-span-2 md:row-span-2';
        if (index === 1) return 'col-span-1 md:row-span-2';
        return 'col-span-1';
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <div className="bg-eggshell-white min-h-screen flex flex-col">
            <Navbar alwaysShown={true} />

            <main className="flex-grow pt-24 pb-20">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-2 px-6 md:px-12 lg:px-20 py-4 text-dusty-olive hover:text-dark-spruce transition-colors duration-300 font-inter font-medium"
                >
                    <ArrowLeft size={18} />
                    Back to Projects
                </motion.button>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="px-6 md:px-12 lg:px-20 py-12 max-w-7xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        {/* Left Column - Title & Info */}
                        <div>
                            <span className="inline-block font-inter text-sm font-medium text-tomato-red uppercase tracking-wider mb-4">
                                {project.category}
                            </span>
                            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-dark-spruce mb-6 leading-tight">
                                {project.title}
                            </h1>
                            <p className="font-inter text-lg text-dark-spruce/70 leading-relaxed mb-8 max-w-xl">
                                {project.fullDescription || project.description}
                            </p>

                            {/* Project Metadata */}
                            <div className="space-y-4 border-t border-dark-spruce/20 pt-8">
                                {project.location && (
                                    <div className="flex items-start gap-3">
                                        <MapPin size={20} className="text-dusty-olive flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="font-inter text-sm text-dark-spruce/60 uppercase tracking-wide">Location</p>
                                            <p className="font-inter text-base text-dark-spruce">{project.location}</p>
                                        </div>
                                    </div>
                                )}
                                {project.year && (
                                    <div className="flex items-start gap-3">
                                        <Calendar size={20} className="text-dusty-olive flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="font-inter text-sm text-dark-spruce/60 uppercase tracking-wide">Year Completed</p>
                                            <p className="font-inter text-base text-dark-spruce">{project.year}</p>
                                        </div>
                                    </div>
                                )}
                                {project.area && (
                                    <div className="flex items-start gap-3">
                                        <Ruler size={20} className="text-dusty-olive flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="font-inter text-sm text-dark-spruce/60 uppercase tracking-wide">Project Area</p>
                                            <p className="font-inter text-base text-dark-spruce">{project.area}</p>
                                        </div>
                                    </div>
                                )}
                                {project.clientType && (
                                    <div className="flex items-start gap-3">
                                        <Users size={20} className="text-dusty-olive flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="font-inter text-sm text-dark-spruce/60 uppercase tracking-wide">Project Type</p>
                                            <p className="font-inter text-base text-dark-spruce">{project.clientType}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Featured Image */}
                        <motion.button
                            type="button"
                            aria-label={`Open ${project.title} featured image`}
                            disabled={!project.galleryImages.length}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative group cursor-pointer rounded-sm overflow-hidden aspect-square"
                            onClick={() => setSelectedImage(0)}
                        >
                            <div className="absolute inset-0 bg-dark-spruce/0 group-hover:bg-dark-spruce/10 transition-colors duration-500 z-10" />
                            <ContentImage
                                src={project.galleryImages[0]?.src ?? project.imageUrl}
                                alt={project.title}
                                loading="eager"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Gallery Section */}
                <motion.div
                    className="px-6 md:px-12 lg:px-20 py-20 max-w-7xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={containerVariants}
                >
                    <motion.h2
                        variants={itemVariants}
                        className="font-serif text-4xl md:text-5xl text-dark-spruce mb-12 italic"
                    >
                        Project Gallery
                    </motion.h2>

                    {/* Responsive Grid Gallery */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[300px]"
                        variants={containerVariants}
                    >
                        {project.galleryImages.map((image, index) => (
                            <motion.button
                                type="button"
                                aria-label={`Open ${project.title} gallery image ${index + 1}`}
                                key={index}
                                className={`group relative overflow-hidden rounded-sm cursor-pointer ${getGridClass(index)}`}
                                variants={itemVariants}
                                onClick={() => setSelectedImage(index)}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="absolute inset-0 bg-dark-spruce/0 group-hover:bg-dark-spruce/15 transition-colors duration-500 z-10" />
                                <ContentImage
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                    <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                                        <span className="text-white text-lg">+</span>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </motion.div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6 }}
                    className="px-6 md:px-12 lg:px-20 py-20 max-w-7xl mx-auto text-center border-t border-dark-spruce/10"
                >
                    <h3 className="font-serif text-3xl md:text-4xl text-dark-spruce mb-6">
                        Inspired by this project?
                    </h3>
                    <p className="font-inter text-lg text-dark-spruce/70 mb-8 max-w-2xl mx-auto">
                        Let's discuss how we can transform your outdoor space into a beautiful landscape that reflects your vision.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="inline-block px-8 py-3 bg-dusty-olive text-eggshell-white font-inter font-medium rounded-sm hover:bg-dark-spruce transition-colors duration-300"
                        >
                            Start Your Project
                        </Link>
                        <button
                            onClick={() => navigate('/projects')}
                            className="inline-block px-8 py-3 border-2 border-dark-spruce text-dark-spruce font-inter font-medium rounded-sm hover:bg-dark-spruce hover:text-eggshell-white transition-colors duration-300"
                        >
                            View More Projects
                        </button>
                    </div>
                </motion.div>
            </main>

            {/* Image Modal */}
            {selectedImage !== null && project.galleryImages[selectedImage] && (
                <Dialog label={`${project.title} image viewer`} onClose={() => setSelectedImage(null)} className="w-full max-w-5xl bg-dark-spruce text-white rounded-lg">
                    <div className="p-4" onKeyDown={(event) => {
                        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                            event.preventDefault();
                            const step = event.key === 'ArrowLeft' ? -1 : 1;
                            setSelectedImage((selectedImage + step + project.galleryImages.length) % project.galleryImages.length);
                        }
                    }}>
                        <div className="mb-4 flex items-center justify-between gap-4"><p aria-live="polite">Image {selectedImage + 1} of {project.galleryImages.length}</p><button type="button" onClick={() => setSelectedImage(null)} className="rounded border border-white/50 px-3 py-2" aria-label="Close image viewer">Close</button></div>
                        <ContentImage src={project.galleryImages[selectedImage].src} alt={project.galleryImages[selectedImage].alt} loading="eager" frameClassName="relative w-full min-h-32" className="mx-auto max-h-[65dvh] max-w-full object-contain" />
                        <div className="mt-4 flex justify-between gap-4"><button type="button" className="rounded border px-3 py-2" onClick={() => setSelectedImage((selectedImage - 1 + project.galleryImages.length) % project.galleryImages.length)}>Previous image</button><button type="button" className="rounded border px-3 py-2" onClick={() => setSelectedImage((selectedImage + 1) % project.galleryImages.length)}>Next image</button></div>
                    </div>
                </Dialog>
            )}

            <Footer />
        </div>
    );
};

export default ProjectDetails;
