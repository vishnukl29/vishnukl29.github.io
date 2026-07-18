import { useState, useCallback } from 'react';
import './index.css';

// Core components
import Cursor         from './components/Cursor';
import Navbar         from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import ScrollBadge    from './components/ScrollBadge';
import LoadingScreen  from './components/LoadingScreen';

// Sections
import Cover      from './sections/Cover';

import About      from './sections/About';
import Skills     from './sections/Skills';
import Projects   from './sections/Projects';
import Gallery    from './sections/Gallery';
import BackCover  from './sections/BackCover';
import Contact    from './sections/Contact';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadDone = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Custom cursor — always on top */}
      <Cursor />

      {/* Loading overlay */}
      {!loaded && <LoadingScreen onDone={handleLoadDone} />}

      {/* Main site (rendered beneath loader for instant first-paint) */}
      <Navbar />
      <ScrollProgress />
      <ScrollBadge />

      <main>
        {/* Page 1: Hero / Cover */}
        <Cover />


        {/* Page 3: About / Origin Story */}
        <About />

        {/* Page 4: Skills / Arsenal */}
        <Skills />

        {/* Page 5: Projects / Epic Missions */}
        <Projects />

        {/* Page 6: Gallery / Captured Work */}
        <Gallery />

        {/* Page 7: Back Cover */}
        <BackCover />

        {/* Page 8: Contact */}
        <Contact />
      </main>
    </>
  );
}
