import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Mail, Phone, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

interface NavbarProps {
  alwaysShown?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ alwaysShown = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "/projects", isExternal: true },
    { name: "About", href: "/about", isExternal: true },
    { name: "Contact", href: "/contact", isExternal: true },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || alwaysShown
          ? "py-3 px-8 bg-eggshell-white/95 backdrop-blur-md shadow-sm border-b border-dark-spruce/5"
          : "py-6 px-8 bg-transparent"
          }`}
        initial={alwaysShown ? { y: 0 } : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <img src={logo} alt="Landscapes India" className="h-10 w-auto" loading="lazy" decoding="async" />
            <span className="hidden md:block font-serif font-bold text-xl text-dark-spruce">
              Landscapes India
            </span>
          </Link>

          <div className="hidden md:flex gap-10">
            {navLinks.map((link) => {
              const isActive = link.isExternal && (
                currentPath === link.href || 
                (link.href !== "/" && currentPath.startsWith(link.href))
              );
              
              return link.isExternal ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-sans font-semibold text-base relative group transition-colors duration-200 ${
                    isActive ? "text-dark-spruce" : "text-dark-spruce/80 hover:text-dark-spruce"
                  }`}
                >
                  {link.name}
                  <span className={`absolute left-0 bottom-[-4px] h-0.5 bg-dark-spruce transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-sans font-semibold text-dark-spruce/80 hover:text-dark-spruce text-base relative group transition-colors duration-200"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-dark-spruce transition-all duration-300 group-hover:w-full"></span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden md:flex items-center gap-2 bg-dark-spruce text-white py-2 px-6 rounded-full font-semibold text-sm hover:bg-tomato-red hover:shadow-[0_8px_24px_rgba(253,96,70,0.25)] transition-all duration-300"
            >
              Let's Talk <ArrowRight size={16} />
            </Link>
            <button
              className="md:hidden block text-dark-spruce"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-eggshell-white z-[60] flex flex-col justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-full h-full p-6 flex flex-col items-center justify-center relative">
              <button
                className="absolute top-6 right-6 text-dark-spruce"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={32} />
              </button>
              <div className="flex flex-col gap-8 items-center">
                {navLinks.map((link) => {
                  const isActive = link.isExternal && (
                    currentPath === link.href || 
                    (link.href !== "/" && currentPath.startsWith(link.href))
                  );
                  
                  return link.isExternal ? (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-serif text-3xl transition-colors duration-200 ${
                        isActive ? "text-tomato-red font-semibold underline" : "text-dark-spruce hover:text-tomato-red"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif text-3xl text-dark-spruce hover:text-tomato-red transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  );
                })}
              </div>
              <div className="flex gap-6 justify-center mt-12 text-dusty-olive">
                <Instagram className="cursor-pointer hover:text-dark-spruce" />
                <Mail className="cursor-pointer hover:text-dark-spruce" />
                <Phone className="cursor-pointer hover:text-dark-spruce" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

