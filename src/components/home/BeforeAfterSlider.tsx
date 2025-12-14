import React, { useState, useRef } from "react";
import { MoveHorizontal } from "lucide-react";
import beforeImg from "../../content/images/projects/arpanbhai/ap1.jpg";
import afterImg from "../../content/images/projects/arvind_uplands/av2.JPG";

const BeforeAfterSlider: React.FC = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;
        const { left, width } = containerRef.current.getBoundingClientRect();
        let clientX;
        if ("touches" in e) {
            clientX = e.touches[0].clientX;
        } else {
            clientX = (e as React.MouseEvent).clientX;
        }

        const pos = ((clientX - left) / width) * 100;
        setSliderPosition(Math.min(100, Math.max(0, pos)));
    };

    return (
        <section className="py-20 px-6 bg-eggshell-white">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
                <div className="text-center">
                    <h2 className="font-serif text-4xl font-semibold text-dark-spruce mb-2">The Transformation</h2>
                    <p className="font-sans text-lg text-dusty-olive">See the difference thoughtful landscaping makes.</p>
                </div>

                <div
                    className="relative w-full max-w-5xl h-[50vh] min-h-[400px] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] cursor-col-resize select-none"
                    ref={containerRef}
                    onMouseMove={(e) => {
                        if (e.buttons === 1) handleDrag(e);
                    }}
                    onTouchMove={(e) => handleDrag(e)}
                    onClick={(e) => handleDrag(e)}
                >
                    <div
                        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${afterImg})` }}
                    >
                        <span className="absolute top-8 right-8 py-2 px-4 bg-black/50 text-white rounded font-sans uppercase tracking-widest text-xs z-10 pointer-events-none">After</span>
                    </div>
                    <div
                        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[2]"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`, backgroundImage: `url(${beforeImg})` }}
                    >
                        <span className="absolute top-8 left-8 py-2 px-4 bg-black/50 text-white rounded font-sans uppercase tracking-widest text-xs pointer-events-none">Before</span>
                    </div>

                    <div className="absolute top-0 bottom-0 w-1 bg-white z-10 pointer-events-none -translate-x-1/2 flex items-center justify-center" style={{ left: `${sliderPosition}%` }}>
                        <div className="w-12 h-12 bg-tomato-red rounded-full flex items-center justify-center shadow-lg">
                            <MoveHorizontal size={24} color="white" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BeforeAfterSlider;
