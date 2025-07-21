export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 border-t border-accent mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-heading text-primary mb-2">🦋 ButterflyVerse</h2>
          <p className="text-sm text-gray-400">
            A smart platform to identify and classify butterfly species using the power of machine learning.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold text-accent mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-primary transition">Home</a></li>
            <li><a href="/detect" className="hover:text-primary transition">Try Now </a></li>
            <li><a href="/models" className="hover:text-primary transition">Try with More Models</a></li>
            <li><a href="/about" className="hover:text-primary transition">About</a></li>
            <li><a href="#contact" className="hover:text-primary transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact / Credits */}
        <div>
          <h3 className="text-xl font-semibold text-accent mb-3">Connect</h3>
          <p className="text-sm text-gray-400">Built with ❤️ by Bibi Aasiya Udagini</p>
          <p className="text-sm text-gray-400 mt-2">© {new Date().getFullYear()} ButterflyVerse. All rights reserved.</p>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-700">
        Made with 💚 using React, Tailwind & Framer Motion.
      </div>
    </footer>
  );
}
