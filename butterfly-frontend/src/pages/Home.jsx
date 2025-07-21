import { motion } from "framer-motion";

export default function Homes() {
  return (
    <div className="bg-background text-text w-full">
      {/* Hero Section */}
      <motion.section
        className="min-h-screen w-full flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-background via-black to-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Discover. Learn. <br /> Classify Butterflies.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl max-w-2xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Welcome to <span className="text-primary font-semibold">ButterflyVerse</span> — your AI-powered platform for butterfly species identification.
        </motion.p>

        <motion.a
          href="#who"
          className="mt-8 bg-accent text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-hover transition-all shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.a>
      </motion.section>

      {/* WHO WE ARE */}
      <motion.section
        id="who"
        className="w-full bg-black py-24 px-6 md:px-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <div className="w-full flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2">
            <img
              src="/image3.avif"
              alt="Who We Are"
              className="w-full h-full rounded-lg shadow-xl object-cover"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-heading text-primary mb-4">
              Who We Are
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We are a team of AI researchers and conservationists dedicated to connecting biodiversity and technology. ButterflyVerse allows users to explore butterfly species from around the world using deep learning-powered classification tools.
            </p>
          </div>
        </div>
      </motion.section>

      {/* WHAT WE DO */}
      <motion.section
        id="what"
        className="w-full bg-background py-24 px-6 md:px-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <div className="w-full flex flex-col md:flex-row-reverse items-center gap-10">
          <div className="w-full md:w-1/2">
            <img
              src="/image.png"
              alt="What We Do"
              className="w-full h-full rounded-lg shadow-xl object-cover"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-heading text-primary mb-4">
              What We Do
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Using advanced image recognition and curated datasets, we identify butterfly species instantly from user uploads. Whether you're a student, researcher, or enthusiast, ButterflyVerse makes learning about nature smarter and simpler.
            </p>
          </div>
        </div>
      </motion.section>

      {/* CONTACT US */}
      <motion.section
        id="contact"
        className="w-full bg-black py-24 px-6 md:px-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <div className="w-full max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading text-primary mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Have a question or want to collaborate? Reach out to our team.
          </p>

          <div className="bg-background border border-accent rounded-xl shadow-md p-6 md:p-10 text-left space-y-4 text-gray-200">
            <p>📧 <strong>Email:</strong> <a href="mailto:support@butterflyverse.org" className="text-accent hover:underline">support@butterflyverse.org</a></p>
            <p>📍 <strong>Address:</strong> NatureTech Lab, Eco Valley, Earth</p>
            <p>🌐 <strong>Website:</strong> <a href="https://butterflyverse.org" className="text-accent hover:underline">www.butterflyverse.org</a></p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
