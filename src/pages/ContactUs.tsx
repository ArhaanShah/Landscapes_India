import React, { useState } from "react";
import { Send, ChevronDown, Mail, Phone } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import leafTexture from "../content/images/pages/contact/leaftexture.png";

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
    });

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        service: false,
    });

    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (errors[e.target.name as keyof typeof errors] !== undefined) {
            setErrors({ ...errors, [e.target.name]: false });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newErrors = {
            name: !formData.name.trim(),
            email: !formData.email.trim(),
            service: !formData.service,
        };
        
        setErrors(newErrors);
        
        if (Object.values(newErrors).some(error => error)) {
            return;
        }
        
        console.log("Form submitted:", formData);
        // submission stuff later
        setSuccessMessage("Thanks for reaching out! We will be in touch shortly.");
        setFormData({ name: "", phone: "", email: "", service: "", message: "" });
        setErrors({ name: false, email: false, service: false });
        
        setTimeout(() => setSuccessMessage(""), 5000);
    };

    return (
        <>
            <Navbar alwaysShown={true} />
            <style>{`
                .floating-input:focus ~ label,
                .floating-input:not(:placeholder-shown) ~ label {
                    transform: translateY(-1.5rem) scale(0.85);
                    color: #13ec5b;
                }
                .floating-input:focus ~ label span,
                .floating-input:not(:placeholder-shown) ~ label span {
                    display: none;
                }
                .floating-select:focus ~ label,
                .floating-select:not([value=""]):valid ~ label {
                    transform: translateY(-1.5rem) scale(0.85);
                    color: #13ec5b;
                }
                .floating-select:focus ~ label span,
                .floating-select:not([value=""]):valid ~ label span {
                    display: none;
                }
            `}</style>
            <section className="pt-32 pb-20 px-6 bg-eggshell-white min-h-screen" id="contact">
            <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col lg:flex-row">

                <div className="relative lg:w-5/12 w-full bg-[#1b4d3e] overflow-hidden flex flex-col justify-between p-8 text-white group">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={leafTexture} 
                            alt="Lush tropical leaves" 
                            className="w-full h-full object-cover opacity-30 mix-blend-overlay transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#1b4d3e]/90 via-[#1b4d3e]/80 to-[#1b4d3e]/95"></div>
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
                                <span className="font-medium text-lg text-white group-hover/link:text-emerald-200 transition-colors">
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
                                <span className="font-medium text-lg text-white group-hover/link:text-emerald-200 transition-colors">
                                    +91 93270 06384
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 w-full p-8 lg:p-14 lg:pl-16 flex flex-col">
                    <div aria-live="polite" aria-atomic="true" className="sr-only">
                        {successMessage}
                    </div>
                    {successMessage && (
                        <div role="status" className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                            {successMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-5 mt-2" aria-labelledby="contact-form-title" aria-describedby="contact-form-description">
                        <div id="contact-form-title" className="sr-only">Contact Form</div>
                        <div id="contact-form-description" className="sr-only">
                            Fill out this form to get in touch. Required fields are marked with an asterisk.
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="relative">
                                <input
                                    className="floating-input form-field peer"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder=" "
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    aria-required="true"
                                    aria-invalid={errors.name}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#13ec5b] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                                >
                                    Your Name <span className="text-[#1B3824]">*</span>
                                </label>
                                {errors.name && (
                                    <p id="name-error" className="text-xs text-dark-spruce mt-1" role="alert">
                                        Name is required
                                    </p>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    className="floating-input form-field peer"
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder=" "
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor="phone"
                                    className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#13ec5b] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                                >
                                    Phone Number
                                </label>
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                className="floating-input form-field peer"
                                id="email"
                                name="email"
                                type="email"
                                placeholder=" "
                                value={formData.email}
                                onChange={handleChange}
                                required
                                aria-required="true"
                                aria-invalid={errors.email}
                                aria-describedby={errors.email ? "email-error" : undefined}
                            />
                            <label
                                htmlFor="email"
                                className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#13ec5b] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                            >
                                Email Address <span className="text-[#1B3824]">*</span>
                            </label>
                            {errors.email && (
                                <p id="email-error" className="text-xs text-dark-spruce mt-1" role="alert">
                                    Email is required
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <select
                                className="floating-select form-field peer"
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                required
                                aria-required="true"
                                aria-invalid={errors.service}
                                aria-describedby={errors.service ? "service-error" : undefined}
                            >
                                <option value="" disabled></option>
                                <option value="maintenance">Garden Maintenance</option>
                                <option value="landscape_design">Landscape Design</option>
                                <option value="hardscaping">Hardscaping</option>
                                <option value="consultation">Consultation</option>
                            </select>
                            <label
                                htmlFor="service"
                                className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#13ec5b] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 pointer-events-none"
                            >
                                Interested Service <span className="text-[#1B3824]">*</span>
                            </label>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                                <ChevronDown size={20} aria-hidden="true" />
                            </div>
                            {errors.service && (
                                <p id="service-error" className="text-xs text-dark-spruce mt-1" role="alert">
                                    Please select a service
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <textarea
                                className="floating-input form-field peer resize-none"
                                id="message"
                                name="message"
                                rows={3}
                                placeholder=" "
                                value={formData.message}
                                onChange={handleChange}
                            />
                            <label
                                htmlFor="message"
                                className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#13ec5b] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[28px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                            >
                                Tell us about your space
                            </label>
                        </div>

                        <div className="mt-auto pt-8">
                            <button
                                type="submit"
                                className="bg-[#1b4d3e] shadow-[0_8px_24px_rgba(24,58,38,0.25)] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#1F1F1B] transition-colors flex items-center justify-center gap-2 group self-start"
                            >
                                Request a conversation <Send size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </button>
                            <p className="text-sm text-gray-500 mt-4 ml-2">We'll follow up <b>personally</b> after reviewing your space. <br></br>
                                Guaranteed reply in less than <b>48 hours</b>.
                            </p>
                        </div>
                    
                    </form>
                </div>

            </div>
        </section>
        <Footer />
        </>
    );
};

export default ContactUs;
