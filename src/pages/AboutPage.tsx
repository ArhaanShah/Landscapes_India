import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Compass, Leaf, Milestone, Layers } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

// Import Assets
import leafTexture from "../content/pages/contact/leaftexture.png";
import aboutBanner from "../content/pages/about/about_banner.png";
import stoneMoss from "../content/pages/about/stone_moss.png";
import founderPlaceholder from "../content/pages/about/founder.svg";

const AboutPage: React.FC = () => {
  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 },
    },
  };

  return (
    <>
      <Navbar alwaysShown={true} />
      
      <main className="min-h-screen bg-eggshell-white text-dark-spruce relative overflow-hidden pt-32 pb-24">
        
        {/* Background Texture Overlay (3% Opacity Leaf Texture) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-multiply">
          <img 
            src={leafTexture} 
            alt="" 
            className="w-full h-full object-cover" 
            aria-hidden="true"
          />
        </div>

        {/* Topographic Line SVG Background Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="topography" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M 0 100 Q 50 70 100 100 T 200 100" fill="none" stroke="#6D8C6E" strokeWidth="0.5" strokeOpacity="0.4" />
                <path d="M 0 50 Q 50 20 100 50 T 200 50" fill="none" stroke="#6D8C6E" strokeWidth="0.5" strokeOpacity="0.3" />
                <path d="M 0 150 Q 50 120 100 150 T 200 150" fill="none" stroke="#6D8C6E" strokeWidth="0.5" strokeOpacity="0.2" />
                <path d="M 0 0 Q 50 -30 100 0 T 200 0" fill="none" stroke="#6D8C6E" strokeWidth="0.5" strokeOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topography)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          
          {/* ================= HERO SECTION ================= */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-32"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-8">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-dark-spruce/10 text-dark-spruce py-1.5 px-4 rounded-full text-xs font-bold uppercase tracking-widest border border-dark-spruce/10">
                <Milestone size={12} />
                <span>Principal Designer</span>
              </motion.div>

              <motion.h1 
                variants={itemVariants} 
                className="font-serif font-bold text-dark-spruce text-5xl md:text-7xl leading-[1.1] tracking-tight"
              >
                The Art of <br />
                <span className="font-serif italic font-normal text-dusty-olive relative">
                  Nature
                  <svg className="absolute -bottom-2 left-0 w-full text-tomato-red/40" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 8 Q 50 2 100 8" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p 
                variants={itemVariants} 
                className="font-sans font-light text-dark-spruce/80 text-lg md:text-xl leading-relaxed max-w-lg"
              >
                Our philosophy blends high-end landscape architecture with organic fluidity. We believe in spaces that breathe, shifting with seasons and light, creating living art.
              </motion.p>

              {/* Established Stamp */}
              <motion.div 
                variants={itemVariants} 
                className="flex items-center gap-4 border-l-2 border-dark-spruce pl-5 py-1"
              >
                <div>
                  <span className="block font-sans font-bold text-[10px] text-dusty-olive uppercase tracking-widest">Established</span>
                  <span className="font-serif font-semibold text-2xl text-dark-spruce leading-none">2000</span>
                </div>
              </motion.div>
            </div>

            {/* Right Collage Column */}
            <motion.div 
              variants={itemVariants} 
              className="lg:col-span-7 relative flex justify-center items-center py-8 lg:py-16"
            >
              {/* Back Project Banner Image Card */}
              <div className="w-11/12 lg:w-10/12 mr-auto aspect-[4/3] rounded-3xl border border-dark-spruce/10 overflow-hidden shadow-2xl bg-ash-grey/30 relative group">
                <img 
                  src={aboutBanner} 
                  alt="Premium modern landscape design featuring reflection pool" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-spruce/40 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Overlapping Front Founder Placeholder Card */}
              <motion.div 
                className="absolute right-0 bottom-0 w-64 md:w-72 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-dark-spruce/10 hover:shadow-2xl transition-shadow duration-300"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-eggshell-white border border-dark-spruce/5">
                  <img 
                    src={founderPlaceholder} 
                    alt="Abhija Dalal Portrait Placeholder" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-serif font-semibold text-xl text-dark-spruce">Abhija Dalal</h3>
                  <p className="font-sans font-medium text-[10px] text-dusty-olive uppercase tracking-widest mt-1">Founder & Lead Architect</p>
                </div>
              </motion.div>

              {/* Topographic Accent Curve SVG floating card */}
              <div className="absolute -top-4 right-12 w-24 h-24 pointer-events-none opacity-30 hidden md:block">
                <svg viewBox="0 0 100 100" className="w-full h-full text-dusty-olive">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3, 3" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.75" />
                  <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1, 2" />
                </svg>
              </div>
            </motion.div>
          </motion.div>

          {/* ================= METHODOLOGY SECTION ================= */}
          <div className="border-t border-dark-spruce/10 pt-24">
            
            <div className="max-w-3xl mb-16">
              <motion.h2 
                className="font-serif font-bold text-dark-spruce text-4xl md:text-5xl tracking-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                Our Methodology
              </motion.h2>
              <motion.p 
                className="font-sans font-light text-dark-spruce/70 text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                How we mold the earth, direct water, select flora, and frame horizons. A choreography of precision drafting and organic growth.
              </motion.p>
            </div>

            {/* Methodology Grid */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              
              {/* Card 1: Topographic Precision */}
              <motion.div 
                className="lg:col-span-7 bg-white/65 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-dark-spruce/10 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:bg-white/80 transition-colors duration-300"
                variants={itemVariants}
                whileHover={{ y: -6 }}
              >
                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-dusty-olive/5 blur-3xl pointer-events-none"></div>
                
                <div>
                  <div className="w-12 h-12 rounded-full bg-dark-spruce text-white flex items-center justify-center shadow-md">
                    <Compass size={22} className="stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif font-bold text-dark-spruce text-3xl mt-8 mb-4">Topographic Precision</h3>
                  <p className="font-sans font-light text-dark-spruce/80 text-base leading-relaxed max-w-xl">
                    Every elevation, every contour is mapped with architectural rigor to ensure the landscape flows seamlessly with the existing natural terrain. We shape slopes to redirect water organically while respecting the natural watershed of the land.
                  </p>
                </div>
                
                <div className="mt-8 flex items-center gap-2 text-tomato-red text-sm font-semibold tracking-wider uppercase group-hover:gap-3 transition-all duration-300">
                  <span>Explore Engineering</span>
                  <ArrowRight size={14} />
                </div>
              </motion.div>

              {/* Card 2: Organic Fluidity */}
              <motion.div 
                className="lg:col-span-5 bg-dark-spruce text-eggshell-white rounded-3xl p-8 md:p-10 border border-white/5 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -6 }}
              >
                {/* Subtle leaf silhouette watermark outline */}
                <div className="absolute bottom-0 right-0 opacity-[0.06] text-white pointer-events-none translate-x-12 translate-y-12">
                  <Leaf size={280} className="stroke-[1.5]" />
                </div>

                <div>
                  <div className="w-12 h-12 rounded-full bg-tomato-red text-white flex items-center justify-center shadow-md">
                    <Leaf size={22} className="stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif font-bold text-white text-3xl mt-8 mb-4">Organic Fluidity</h3>
                  <p className="font-sans font-light text-emerald-100/80 text-base leading-relaxed">
                    Softening the rigid lines of modern architecture with the tactile, unpredictable beauty of flora. We select species that grow in layers, creating textures that adapt dynamically to the wind, light, and seasons.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-tomato-red text-sm font-semibold tracking-wider uppercase group-hover:gap-3 transition-all duration-300">
                  <span>View Botanical Approach</span>
                  <ArrowRight size={14} />
                </div>
              </motion.div>

              {/* Card 3: Stonework close-up image */}
              <motion.div 
                className="lg:col-span-4 rounded-3xl overflow-hidden border border-dark-spruce/10 shadow-md min-h-[300px] lg:min-h-auto relative group"
                variants={itemVariants}
                whileHover={{ y: -6 }}
              >
                <img 
                  src={stoneMoss} 
                  alt="High-resolution slate pavers texture with green moss in joint lines" 
                  className="w-full h-full object-cover absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-dark-spruce/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </motion.div>

              {/* Card 4: The Vocabulary of Earth */}
              <motion.div 
                className="lg:col-span-8 bg-dusty-olive/15 rounded-3xl p-8 md:p-10 border border-dark-spruce/10 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:bg-dusty-olive/20 transition-colors duration-300"
                variants={itemVariants}
                whileHover={{ y: -6 }}
              >
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-white/20 blur-2xl pointer-events-none"></div>

                <div>
                  <div className="inline-flex items-center gap-2 bg-dark-spruce/10 text-dark-spruce py-1 px-3.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-dark-spruce/10">
                    <Layers size={10} />
                    <span>Materiality</span>
                  </div>
                  <h3 className="font-serif font-bold text-dark-spruce text-3xl mt-6 mb-4">The Vocabulary of Earth</h3>
                  <p className="font-sans font-light text-dark-spruce/80 text-base leading-relaxed max-w-2xl">
                    We select materials that age gracefully—raw stone, weathering steel, and sustainable hardwoods. Our palette is drawn directly from the site context, ensuring the built environment feels inevitable rather than imposed.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-tomato-red text-sm font-semibold tracking-wider uppercase group-hover:gap-3 transition-all duration-300">
                  <span>Learn Sustainability Ethos</span>
                  <ArrowRight size={14} />
                </div>
              </motion.div>

            </motion.div>
          </div>
          
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;
