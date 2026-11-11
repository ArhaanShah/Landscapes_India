import { Link } from 'react-router-dom';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';

export default function NotFound() {
    return <div className="flex min-h-screen flex-col bg-eggshell-white"><Navbar alwaysShown /><main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center"><h1 className="text-4xl">Page not found</h1><p>This address does not match a page on this site.</p><Link to="/" className="rounded-full bg-dark-spruce px-6 py-3 text-white">Back to home</Link></main><Footer /></div>;
}
