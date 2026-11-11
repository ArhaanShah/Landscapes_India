import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Instagram, Mail, Phone, ArrowRight } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import Dialog from '../Dialog';
import logo from '../../assets/logo.png';

const links = [{ name: 'Projects', href: '/projects' }, { name: 'About', href: '/about' }, { name: 'Contact', href: '/contact' }];

export default function Navbar({ alwaysShown = false }: { alwaysShown?: boolean }) {
    const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 50);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const scroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', scroll, { passive: true });
        return () => window.removeEventListener('scroll', scroll);
    }, []);
    useEffect(() => {
        const media = window.matchMedia('(min-width: 768px)');
        const resize = () => { if (media.matches) setOpen(false); };
        media.addEventListener('change', resize);
        return () => media.removeEventListener('change', resize);
    }, []);

    return <>
        <motion.nav aria-label="Main navigation" className={`fixed top-0 left-0 z-50 w-full px-6 transition-all duration-300 ${isScrolled || alwaysShown ? 'border-b border-dark-spruce/5 bg-eggshell-white/95 py-3 shadow-sm backdrop-blur-md' : 'bg-transparent py-6'}`} initial={alwaysShown ? false : { y: -100 }} animate={{ y: 0 }}>
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <Link to="/" className="flex items-center gap-3"><img src={logo} alt="Landscapes India" className="h-10 w-auto" /><span className="hidden font-serif text-xl font-bold md:block">Landscapes India</span></Link>
                <div className="hidden gap-10 md:flex">{links.map(link => <NavLink key={link.href} to={link.href} className={({ isActive }) => `font-semibold ${isActive ? 'underline underline-offset-8' : 'text-dark-spruce/80 hover:text-dark-spruce'}`}>{link.name}</NavLink>)}</div>
                <Link to="/contact" className="hidden items-center gap-2 rounded-full bg-dark-spruce px-6 py-2 text-sm font-semibold text-white hover:bg-tomato-red md:flex">Let's Talk <ArrowRight size={16} aria-hidden="true" /></Link>
                <button type="button" className="p-2 md:hidden" aria-label="Open menu" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}><Menu /></button>
            </div>
        </motion.nav>
        {open && <Dialog label="Mobile navigation" onClose={() => setOpen(false)} className="h-[100dvh] w-screen !max-h-none !max-w-none bg-eggshell-white">
            <div className="relative flex min-h-[100dvh] flex-col items-center justify-center gap-12 p-6">
                <button type="button" className="absolute top-6 right-6 p-2" aria-label="Close menu" onClick={() => setOpen(false)}><X size={32} /></button>
                <nav aria-label="Mobile links" className="flex flex-col items-center gap-8">{links.map(link => <NavLink key={link.href} to={link.href} onClick={() => setOpen(false)} className={({ isActive }) => `font-serif text-3xl ${isActive ? 'text-tomato-red underline' : ''}`}>{link.name}</NavLink>)}</nav>
                <div className="flex gap-6">
                    <a href="https://www.instagram.com/landscapesindiaofficial/" aria-label="Instagram"><Instagram /></a>
                    <a href="mailto:landscapesindia2015@gmail.com" aria-label="Email Landscapes India"><Mail /></a>
                    <a href="tel:+919327006384" aria-label="Call Landscapes India"><Phone /></a>
                </div>
            </div>
        </Dialog>}
    </>;
}
