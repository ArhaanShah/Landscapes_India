import React from "react";
import { Mail, Phone } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import InquiryForm from "../components/InquiryForm";
import leafTexture from "../content/pages/contact/leaftexture.png";

const ContactUs: React.FC = () => {
    return (
        <>
            <Navbar alwaysShown={true} />
            <main className="pt-32 pb-20 px-6 bg-eggshell-white min-h-screen" id="contact">
            <div className="group/contact max-w-6xl mx-auto bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col lg:flex-row">

                <div className="relative lg:w-5/12 w-full bg-[#1b4d3e] overflow-hidden flex flex-col justify-between p-8 text-white">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={leafTexture} 
                            alt="Lush tropical leaves" 
                            className="w-full h-full object-cover opacity-70 transition-transform duration-700 ease-out motion-safe:group-hover/contact:scale-105 motion-safe:group-focus-within/contact:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#1b4d3e]/80 via-[#1b4d3e]/60 to-[#1b4d3e]/85"></div>
                    </div>
                    
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl"></div>

                    <div className="relative z-10 space-y-8 mt-0">
                        <div className="w-16 h-1 bg-emerald-300/50 rounded-full mb-6"></div>
                        <h1 className="font-serif text-emerald-100 italic text-5xl lg:text-6xl font-medium leading-tight tracking-tight">
                            Let's create <br></br>your{" "}<br></br>
                            <span className="text-emerald-100 relative inline-block">
                                sanctuary.
                                <svg 
                                    className="absolute -bottom-2 left-0 w-full" 
                                    viewBox="0 0 100 10" 
                                    preserveAspectRatio="none"
                                >
                                    <path 
                                        d="M0 5 Q 50 10 100 5" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        className="opacity-50"
                                    />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-emerald-50/90 text-lg leading-relaxed font-light max-w-md">
                            Considering a landscape project? Share a few details about your space and what you're hoping to create...we'll take it from there.
                        </p>
                    </div>

                    <div className="relative z-10 mt-12 space-y-6 border-t border-white/10 pt-8">
                        <p className="text-emerald-100/70 text-sm font-medium uppercase tracking-widest">
                            Or reach us directly:
                        </p>
                        <div className="space-y-4">
                            <a 
                                href="mailto:landscapesindia2015@gmail.com" 
                                className="flex items-center gap-4 group/link transition-all duration-300 hover:translate-x-2"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover/link:bg-white/20 transition-colors">
                                    <Mail size={18} className="text-emerald-100" />
                                </div>
                                <span className="break-all font-medium text-base sm:text-lg text-white group-hover/link:text-emerald-200 transition-colors">
                                    landscapesindia2015@gmail.com
                                </span>
                            </a>
                            <a 
                                href="tel:+919327006384" 
                                className="flex items-center gap-4 group/link transition-all duration-300 hover:translate-x-2"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover/link:bg-white/20 transition-colors">
                                    <Phone size={18} className="text-emerald-100" />
                                </div>
                                <span className="break-all font-medium text-base sm:text-lg text-white group-hover/link:text-emerald-200 transition-colors">
                                    +91 93270 06384
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 w-full p-8 lg:p-14 lg:pl-16 flex flex-col">
                    <InquiryForm />
                </div>

            </div>
        </main>
        <Footer />
        </>
    );
};

export default ContactUs;
