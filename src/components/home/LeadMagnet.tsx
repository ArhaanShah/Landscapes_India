import React, { useState } from "react";
import { Send } from "lucide-react";

const LeadMagnet: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // submission stuff later
        alert("Thanks for reaching out! We will be in touch shortly.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section className="py-20 px-6 bg-eggshell-white" id="contact">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row">

                <div className="bg-dusty-olive p-10 md:w-2/5 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-dark-spruce/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>

                    <div className="relative z-10">
                        <h3 className="font-serif text-3xl font-semibold mb-4">Let's create your sanctuary.</h3>
                        <p className="font-sans text-white/90 leading-relaxed">Planning a landscape project? Tell us a bit about your site and we’ll follow up.</p>
                    </div>

                    <div className="relative z-10 mt-12 space-y-4 font-sans text-sm">
                        <p className="opacity-80">Or reach us directly:</p>
                        <div>
                            <p className="font-semibold">hello@landscapesindia.com</p>
                            <p className="font-semibold">+91 98765 43210</p>
                        </div>
                    </div>
                </div>

                <div className="p-10 md:w-3/5">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="font-sans text-sm font-semibold text-dark-spruce uppercase tracking-wider">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border-b border-ash-grey py-2 focus:outline-none focus:border-dusty-olive transition-colors bg-transparent placeholder-gray-400"
                                placeholder="How should we address you?"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-sans text-sm font-semibold text-dark-spruce uppercase tracking-wider">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border-b border-ash-grey py-2 focus:outline-none focus:border-dusty-olive transition-colors bg-transparent placeholder-gray-400"
                                placeholder="Where can we reach you?"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="font-sans text-sm font-semibold text-dark-spruce uppercase tracking-wider">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={3}
                                className="w-full border-b border-ash-grey py-2 focus:outline-none focus:border-dusty-olive transition-colors bg-transparent placeholder-gray-400 resize-none"
                                placeholder="Tell us about your site..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 bg-dark-spruce text-white py-3 px-6 rounded-full font-semibold hover:bg-[#1B3824] transition-colors flex items-center justify-center gap-2 group self-start"
                        >
                            Request a conversation <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default LeadMagnet;
