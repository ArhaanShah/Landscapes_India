import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetails from "./pages/projects/ProjectDetails";
import ContactUs from "./pages/ContactUs";
import AboutPage from "./pages/AboutPage";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css"; // Ensure global styles/tailwind are loaded

function App() {
    return (
        <MotionConfig reducedMotion="user"><Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:projectId" element={<ProjectDetails />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router></MotionConfig>
    );
}

export default App;
