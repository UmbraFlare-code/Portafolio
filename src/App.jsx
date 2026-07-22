import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProjectDetails from './pages/ProjectDetails';
import ExperienceDetails from './pages/ExperienceDetails';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';

function App() {
  return (
    <Router basename="/Portafolio">
      <CustomCursor />
      <PageTransition>
        {(location) => (
          <Routes location={location}>
            <Route path="/" element={<MainLayout />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route path="/experience/:slug" element={<ExperienceDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </PageTransition>
    </Router>
  );
}

export default App;
