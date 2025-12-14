import React from "react";
import { motion } from "framer-motion";
import { PenTool, ShieldCheck, ListChecks, ArrowRight } from "lucide-react";

const ValueStrip: React.FC = () => {
    const values = [
        {
            icon: <PenTool size={32} />,
            title: "Thoughtful design",
            text: "Every landscape is shaped by site, climate, and how you actually live.",
        },
        {
            icon: <ShieldCheck size={32} />,
            title: "Built to last",
            text: "We design with materials and details that age beautifully over time.",
        },
        {
            icon: <ListChecks size={32} />,
            title: "Clear process",
            text: "You’ll always know what’s next, and why.",
        },
    ];

    return (
        <section className="py-20 px-6 bg-eggshell-white border-b border-ash-grey/50">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
                <div className="flex gap-8 w-full overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-ash-grey scrollbar-track-transparent md:justify-center">
                    {values.map((val, index) => (
                        <motion.div
                            className="flex-1 min-w-[280px] bg-white p-10 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex flex-col items-start gap-4 border border-transparent hover:-translate-y-1 hover:border-dusty-olive transition-all duration-300 snap-center"
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="bg-eggshell-white text-dusty-olive p-4 rounded-full inline-flex">
                                {val.icon}
                            </div>
                            <h3 className="font-serif text-2xl text-dark-spruce font-semibold">
                                {val.title}
                            </h3>
                            <p className="text-gray-600 text-base leading-relaxed">
                                {val.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <a
                        href="#contact"
                        className="bg-tomato-red text-white py-3 px-6 rounded-full font-semibold flex items-center gap-2 hover:bg-[#e5563f] hover:-translate-y-0.5 transition-all shadow-md"
                    >
                        Get a free quote now! <ArrowRight size={18} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default ValueStrip;
