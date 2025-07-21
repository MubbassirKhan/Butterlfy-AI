import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function NavBar() {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect scroll to toggle sticky theme
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isSticky
          ? "bg-black/90 backdrop-blur-lg shadow-md border-b border-accent"
          : "bg-background border-b border-accent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl md:text-3xl font-heading font-bold text-primary">
          🦋 ButterflyVerse
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-sans">
          <li>
            <a href="/" className="hover:text-primary transition-colors">Home</a>
          </li>
          <li>
            <a href="/detect" className="hover:text-primary transition-colors">Species</a>
          </li>
          <li>
            <a href="/about" className="hover:text-primary transition-colors">About</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-text text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg text-text text-center py-6 space-y-4">
          <a href="/" className="block hover:text-primary" onClick={toggleMenu}>Home</a>
          <a href="/detect" className="block hover:text-primary" onClick={toggleMenu}>Species</a>
          <a href="#about" className="block hover:text-primary" onClick={toggleMenu}>About</a>
          <a href="#contact" className="block hover:text-primary" onClick={toggleMenu}>Contact</a>
        </div>
      )}
    </nav>
  );
}
