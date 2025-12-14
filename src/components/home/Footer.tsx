import React from "react";
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logo from "../../assets/logo.png";

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#1a3320] text-white pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">

                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="Landscapes India" className="h-12 w-auto" />
                        <span className="font-serif font-bold text-xl">Landscapes India</span>
                    </div>
                    <p className="font-sans text-sm text-white/60 leading-relaxed max-w-xs">
                        Designing outdoor spaces that honour nature and nurture the human spirit.
                    </p>
                </div>

                <div>
                    <div className="font-serif text-lg font-semibold mb-6">Explore</div>
                    <ul className="space-y-4 font-sans text-sm text-white/70">
                        <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
                        <li><a href="#about" className="hover:text-white transition-colors">Our Approach</a></li>
                        <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                        <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <div className="font-serif text-lg font-semibold mb-6">Legal</div>
                    <ul className="space-y-4 font-sans text-sm text-white/70">
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>

                <div>
                    <div className="font-serif text-lg font-semibold mb-6">Connect</div>
                    <div className="flex flex-col gap-4 font-sans text-sm text-white/70">
                        <a href="mailto:landscapesindia2015@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors">
                            <Mail size={18} /> landscapesindia2015@gmail.com
                        </a>
                        <a href="tel:+919327006384" className="flex items-center gap-3 hover:text-white transition-colors">
                            <Phone size={18} /> +91 93270 06384
                        </a>
                        <div className="flex items-center gap-3">
                            <MapPin size={18} /> Ahmedabad, Gujarat
                        </div>

                        <div className="flex gap-4 mt-4">
                            <a href="https://www.instagram.com/landscapesindiaofficial/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-dark-spruce transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/abhija-dalal-75414225" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-dark-spruce transition-all">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-xs text-white/40">
                <p>&copy; {new Date().getFullYear()} Landscapes India. All rights reserved.</p>
                <p className="flex items-center gap-1">Designed with <span className="text-tomato-red">♥</span> in Ahmedabad</p>
            </div>
        </footer>
    );
};

export default Footer;
