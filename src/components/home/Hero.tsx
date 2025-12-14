import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import heroBg from "../../content/images/pages/home/herobgf.jpg";

const Hero: React.FC = () => {
    return (
        <section className="relative w-full h-[90vh] min-h-[500px] flex items-center justify-center overflow-hidden text-eggshell-white px-0 sm:px-6">
            <div className="absolute inset-0 z-0 w-full h-full">
                <img
                    src={heroBg}
                    alt="Lush landscape"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    style={{ objectPosition: 'center 60%' }}
                />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#22442b]/30 to-[#22442b]/70"></div>
            </div>

            <div className="max-w-4xl z-10 flex flex-col items-center gap-6 text-center px-4 sm:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="flex flex-col leading-[1.1] drop-shadow-lg">
                        <span className="font-sans font-bold text-4xl md:text-6xl tracking-[-0.02em] text-white uppercase mb-2">
                            Your home,
                        </span>
                        <span className="font-script font-normal text-5xl md:text-[5.5rem] text-eggshell-white -rotate-2">
                            Thoughtfully Extended.
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    className="font-sans text-lg md:text-xl leading-relaxed text-[#f0f0f0] max-w-2xl mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Each project responds to climate, context, and how the space will be used.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <a
                        href="#contact"
                        className="bg-tomato-red text-white py-4 px-8 rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-[#e5563f] hover:-translate-y-0.5 transition-all shadow-lg"
                    >
                        Get a Free Site Visit <ArrowRight size={20} />
                    </a>
                </motion.div>

                <motion.div
                    className="flex flex-wrap justify-center items-center gap-4 mt-8 text-sm md:text-base text-white/90"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <div className="flex items-center gap-1.5">
                        <CheckCircle size={16} className="text-ash-grey" />
                        <span>We listen first</span>
                    </div>
                    <div className="text-ash-grey font-bold">•</div>
                    <div className="flex items-center gap-1.5">
                        <CheckCircle size={16} className="text-ash-grey" />
                        <span>20+ years of experience</span>
                    </div>
                    <div className="text-ash-grey font-bold">•</div>
                    <div className="flex items-center gap-1.5">
                        <CheckCircle size={16} className="text-ash-grey" />
                        <span>Details matter</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
