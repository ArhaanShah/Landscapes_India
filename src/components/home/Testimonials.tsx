import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const Testimonials: React.FC = () => {
    const testimonials = [
        {
            id: 1,
            text: "Our garden has become our favorite room in the house. The attention to detail is simply unmatched.",
            author: "Priya & Rajesh Mehta",
            role: "Homeowners",
        },
        {
            id: 2,
            text: "Professional, creative, and deeply respectful of the environment. A joy to work with.",
            author: "Arvind Construction Group",
            role: "Developer",
        },
        {
            id: 3,
            text: "They didn't just plant trees; they curated an experience. Waking up to this view is a blessing.",
            author: "Dr. Ananya Reddy",
            role: "Client",
        },
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <section className="py-20 px-6 bg-dark-spruce text-eggshell-white text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <div className="mb-8 opacity-50">
                    <Quote size={48} className="text-ash-grey fill-current" />
                </div>

                <div className="min-h-[200px] w-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <p className="font-serif text-2xl md:text-4xl leading-snug italic">"{testimonials[current].text}"</p>
                            <div className="flex flex-col items-center gap-1">
                                <h4 className="text-tomato-red text-lg uppercase tracking-wider font-sans font-semibold">{testimonials[current].author}</h4>
                                <span className="font-sans text-sm text-white/60">{testimonials[current].role}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex gap-3 mt-12">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === current ? "bg-tomato-red scale-125" : "bg-white/20 hover:bg-white/40"}`}
                            onClick={() => setCurrent(idx)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
