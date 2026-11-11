import React from "react";
import InquiryForm from "../InquiryForm";

const LeadMagnet: React.FC = () => {
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
                            <a className="block break-all font-semibold" href="mailto:landscapesindia2015@gmail.com">landscapesindia2015@gmail.com</a>
                            <a className="block font-semibold" href="tel:+919327006384">+91 93270 06384</a>
                        </div>
                    </div>
                </div>

                <div className="p-10 md:w-3/5">
                    <InquiryForm compact />
                </div>

            </div>
        </section>
    );
};

export default LeadMagnet;
