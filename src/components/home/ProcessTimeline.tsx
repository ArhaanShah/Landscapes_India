import React from "react";
import { motion } from "framer-motion";
import { Compass, PenTool, Sprout, Hammer, HandHeart } from "lucide-react";

const ProcessTimeline: React.FC = () => {
    const steps = [
        {
            icon: <Compass size={32} />,
            title: "Discovery",
            desc: "We visit your site to understand the light, soil, and spirit of the place.",
        },
        {
            icon: <PenTool size={32} />,
            title: "Concept",
            desc: "Sketches and mood boards that align with your vision.",
        },
        {
            icon: <Sprout size={32} />,
            title: "Planting Plan",
            desc: "Selecting the right flora that thrives in your specific ecosystem.",
        },
        {
            icon: <Hammer size={32} />,
            title: "Build",
            desc: "Crafting hardscapes and softscapes with precision.",
        },
        {
            icon: <HandHeart size={32} />,
            title: "Care",
            desc: "Guidance on how to let your garden grow wild and beautiful.",
        },
    ];

    return (
        <section className="py-20 px-6 bg-white" id="about">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
                <div className="text-center">
                    <h2 className="font-serif text-4xl font-semibold text-dark-spruce mb-2">Our Approach</h2>
                    <p className="font-sans text-lg text-[#666]">From seed of an idea to a living sanctuary.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 relative max-w-5xl mx-auto md:w-full md:justify-between py-8">
                    <div className="hidden md:block absolute top-[68px] left-[32px] w-[calc(100%-64px)] h-0.5 border-t-2 border-dashed border-ash-grey z-0"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex md:flex-col gap-6 md:gap-4 items-start md:items-center relative z-10 flex-1 md:text-center group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                        >
                            {index < steps.length - 1 && (
                                <div className="md:hidden absolute top-[64px] left-[32px] w-0.5 h-[calc(100%-32px)] border-l-2 border-dashed border-ash-grey z-0"></div>
                            )}

                            <div className="shrink-0 w-16 h-16 bg-eggshell-white rounded-full border border-dashed border-dusty-olive text-dark-spruce flex items-center justify-center relative z-10 group-hover:bg-dusty-olive group-hover:text-white transition-colors duration-300">
                                {step.icon}
                                <div className="absolute -top-1.5 -right-1.5 bg-tomato-red text-white w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center">
                                    {index + 1}
                                </div>
                            </div>
                            <div className="pt-2 md:pt-0">
                                <h3 className="font-serif text-xl md:text-2xl text-dark-spruce mb-2 font-medium">{step.title}</h3>
                                <p className="font-sans text-sm md:text-base text-gray-500 leading-relaxed md:max-w-[200px] mx-auto">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessTimeline;
