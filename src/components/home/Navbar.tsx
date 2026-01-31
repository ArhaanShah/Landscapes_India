import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Mail, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

interface NavbarProps {
  alwaysShown?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ alwaysShown = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "/projects", isExternal: true },
    { name: "About", href: "/#about", isExternal: false },
    { name: "Contact", href: "/contact", isExternal: true },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || alwaysShown
          ? "py-3 px-8 bg-eggshell-white/95 backdrop-blur-md shadow-sm"
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
            {navLinks.map((link) => (
              link.isExternal ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-sans font-medium text-dark-spruce text-base relative group transition-colors"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-dark-spruce transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-sans font-medium text-dark-spruce text-base relative group transition-colors"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-dark-spruce transition-all duration-300 group-hover:w-full"></span>
                </a>
              )
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden md:flex items-center gap-2 bg-tomato-red text-white py-2 px-5 rounded-full font-semibold text-sm hover:bg-dark-spruce transition-all duration-200"
            >
              Let's Talk <ArrowRight size={16} />
            </Link>
            <button
              className="md:hidden block text-dark-spruce"
              onClick={() => setMobileMenuOpen(true)}
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
              >
                <X size={32} />
              </button>
              <div className="flex flex-col gap-8 items-center">
                {navLinks.map((link) => (
                  link.isExternal ? (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif text-3xl text-dark-spruce hover:text-dark-spruce transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif text-3xl text-dark-spruce hover:text-dark-spruce transition-colors"
                    >
                      {link.name}
                    </a>
                  )
                ))}
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
