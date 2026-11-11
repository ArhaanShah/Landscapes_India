import { useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import beforeImg from '../../content/projects/arpanbhai/ap1_lg.webp';
import afterImg from '../../content/projects/arvind_uplands/av2_lg.webp';

export default function BeforeAfterSlider() {
    const [position, setPosition] = useState(50);
    return <section className="bg-eggshell-white px-6 py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12">
            <div className="text-center"><h2 className="mb-2 font-serif text-4xl">Landscape Comparison</h2><p id="comparison-description" className="text-dusty-olive">Demo interaction using two different projects, rather than a before/after transformation.</p></div>
            <div className="relative h-[50vh] min-h-[300px] w-full max-w-5xl overflow-hidden rounded-3xl shadow-xl focus-within:ring-4 focus-within:ring-tomato-red">
                <img src={afterImg} alt="Arvind Uplands landscape" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <span aria-hidden="true" className="absolute top-6 right-6 rounded bg-black/60 px-3 py-2 text-xs text-white">Arvind Uplands</span>
                <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><img src={beforeImg} alt="Arpanbhai residence landscape" loading="lazy" className="h-full w-full object-cover" /><span aria-hidden="true" className="absolute top-6 left-6 rounded bg-black/60 px-3 py-2 text-xs text-white">Arpanbhai Residence</span></div>
                <div aria-hidden="true" className="pointer-events-none absolute top-0 bottom-0 flex w-1 -translate-x-1/2 items-center justify-center bg-white" style={{ left: `${position}%` }}><div className="rounded-full bg-tomato-red p-3"><MoveHorizontal size={24} color="white" /></div></div>
                <input type="range" min="0" max="100" value={position} onChange={event => setPosition(Number(event.target.value))} aria-label="Landscape comparison position" aria-describedby="comparison-description" aria-valuetext={`${position}% Arpanbhai Residence`} className="absolute inset-0 m-0 h-full w-full cursor-ew-resize opacity-0" />
            </div>
        </div>
    </section>;
}
