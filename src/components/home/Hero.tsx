import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import heroBg from "../../content/images/pages/home/herobg_lg.webp";

const Hero: React.FC = () => {
    return (
        <section className="relative w-full h-[100vh] min-h-[500px] flex items-start justify-start overflow-hidden text-eggshell-white px-0 sm:px-6">
            <div className="absolute inset-0 z-0 w-full h-full">
                <img
                    src={heroBg}
                    alt="Lush landscape"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    style={{ objectPosition: 'center 60%' }}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                />
            </div>
            
            <div 
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.05) 50%, transparent 70%)'
                }}
            />

            <div className="max-w-[550px] z-10 flex flex-col items-start gap-6 text-left px-6 sm:px-8 pt-32 ml-4 sm:ml-12 md:ml-16">
                <motion.div
                    initial={{ opacity: 0, y: 30, rotateZ: -2.5  }}
                    animate={{ opacity: 1, y: 0, rotateZ: -2.5 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
  transformOrigin: "left center",
  display: "inline-block",
}}

                >
                    <div className="relative inline-block mb-[2rem]">
                        <div className="absolute inset-[-14px] sm:inset-[-18px] bg-dark-spruce/55 blur-3xl rounded-[28px] -z-10 pointer-events-none" />
                        <h1 className="inline-flex items-baseline sm:whitespace-nowrap leading-[1.05] drop-shadow-lg">
                            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl lg:mt-1 2xl:mt-3 tracking-[0.01em] text-white uppercase mr-2 md:mr-3" style={{ fontFamily: '"Chicle", sans-serif' }}>
                                Your home,
                            </span>
                            <span className="font-script font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
                                Thoughtfully Extended.
                            </span>
                        </h1>
                    </div>
                    <motion.div
                        className="relative inline-block mt-2 sm:hidden"
                        initial={{ opacity: 0, y: 12, rotateZ: -2 }}
                        animate={{ opacity: 1, y: 0, rotateZ: -2 }}
                        transition={{ duration: 0.8, delay: 0.35 }}
                        style={{ transformOrigin: "left center" }}
                    >
                        <div className="absolute inset-[-12px] bg-dark-spruce/55 blur-2xl rounded-[24px] -z-10 pointer-events-none" />
                        <h2 className="hidden text-l leading-tight text-eggshell-white font-semibold tracking-tight">
                            Landscape Design shaped by listening, context, and care.
                        </h2>
                    </motion.div>
                </motion.div>
                
                

                <motion.div
                    className="absolute bottom-[3.5rem] left-0 right-0 px-6 sm:relative sm:-top-8 lg:-top-6 2xl:-top-10 sm:left-auto sm:right-auto sm:px-0 z-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <a
                        href="#contact"
                        className="bg-black/60 sm:bg-tomato-red text-white py-2 px-8 rounded-lg sm:rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:bg-dark-spruce/80 sm:hover:bg-dark-spruce transition-all shadow-lg border border-white/70 sm:border-0"
                    >
                        Request a Site Visit  <ArrowRight size={20} />
                    </a>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 bg-dark-spruce/90 sm:bg-dark-spruce/70 rounded-t-3xl px-8 py-2 w-auto inline-block">
                <motion.div
                    className="flex items-center justify-center gap-6 text-xs sm:text-sm md:text-base text-eggshell-white whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <div className="hidden sm:flex items-center gap-1.5">
                        <CheckCircle size={16} />
                        <span className="whitespace-nowrap">We listen first</span>
                    </div>
                    <div className="hidden sm:block font-bold">•</div>
                    <div className="flex items-center gap-1.5">
                        <CheckCircle size={16} />
                        <span className="whitespace-nowrap ">20+ Years of Residential Practice</span>
                    </div>
                    <div className="hidden sm:block font-bold">•</div>
                    <div className="hidden sm:flex items-center gap-1.5">
                        <CheckCircle size={16} />
                        <span className="whitespace-nowrap">100+ Residential Landscapes Completed</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;