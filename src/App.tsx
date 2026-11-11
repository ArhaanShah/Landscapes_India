import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetails from "./pages/projects/ProjectDetails";
import ContactUs from "./pages/ContactUs";
import AboutPage from "./pages/AboutPage";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css"; // Ensure global styles/tailwind are loaded

function AnimatedRoutes() {
    const location = useLocation();
    const reduceMotion = useReducedMotion();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={location.pathname}
                data-page={location.pathname}
                className="min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.14 } }}
                transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
                <ScrollToTop pathname={location.pathname} hash={location.hash} />
                <Routes location={location}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/projects/:projectId" element={<ProjectDetails />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
}

function App() {
    return (
        <MotionConfig reducedMotion="user">
            <Router>
                <AnimatedRoutes />
            </Router>
        </MotionConfig>
    );
}

export default App;
