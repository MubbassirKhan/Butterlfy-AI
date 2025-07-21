import { Routes, Route } from 'react-router-dom';
import Homes from './pages/Home';
import AboutUs from './pages/AboutUs';
import DetectSpecies from './pages/DetectSpecies';
import MoreModels from './pages/MoreModels';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-text">
      <NavBar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Homes />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/detect" element={<DetectSpecies />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/models" element={<MoreModels />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<h1 className="text-center text-2xl mt-10">Page Not Found</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
