import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="bg-background text-text">
      {/* Hero Section */}
      <motion.section
        className="min-h-[60vh] flex flex-col justify-center items-center text-center px-6 py-16 bg-gradient-to-r from-black to-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-heading font-bold text-primary"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        >
          👩🏻‍💻 Bibi Aasiya Udagini
        </motion.h1>
        <p className="text-lg text-gray-300 mt-4 max-w-2xl">
          MCA Final Year Student | Full Stack Web Developer | ML Intern @ Career Boat
        </p>
      </motion.section>

      {/* Summary */}
      <motion.section
        className="py-16 px-6 md:px-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="bg-black/70 backdrop-blur-lg border border-accent rounded-xl p-8 md:p-12 shadow-xl">
          <h2 className="text-3xl font-heading text-primary mb-4">Professional Summary</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            I'm an aspiring Full Stack Developer currently pursuing my MCA. I enjoy crafting interactive, responsive websites and exploring Machine Learning. I completed a hands-on internship at <span className="text-accent font-semibold">Career Boat</span> where I worked on AI-based solutions.
          </p>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        className="py-16 px-6 md:px-20 bg-gradient-to-bl from-background to-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-heading text-primary mb-6 text-center">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {["React", "Node.js", "Flask", "MongoDB", "MySQL", "Tailwind CSS", "Python", "Machine Learning", "Git/GitHub", "Express", "REST API", "HTML5", "CSS3", "JavaScript"].map((skill) => (
            <span key={skill} className="bg-black/70 border border-accent px-4 py-2 rounded-full text-sm text-text font-medium hover:bg-accent hover:text-black transition">
              {skill}
            </span>
          ))}
        </div>
      </motion.section>

      {/* Experience Timeline */}
      <motion.section
        className="py-16 px-6 md:px-20 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-heading text-primary mb-10 text-center">Experience</h2>
        <div className="space-y-8 border-l-2 border-accent pl-6">
          <div>
            <h3 className="text-xl font-semibold text-accent">💼 Machine Learning Intern – Career Boat</h3>
            <p className="text-gray-300 text-md">Apr 2024 – July 2024</p>
            <p className="mt-2 text-gray-400 text-lg">
              Worked on real-time ML applications using Python and Flask. Developed backend logic and deployed models for production use.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-accent">🎓 MCA Student – KLE IT, Hubli</h3>
            <p className="text-gray-300 text-md">2023 – Present</p>
            <p className="mt-2 text-gray-400 text-lg">
              Learning advanced web technologies, databases, software architecture, and data science. Actively involved in tech projects and hackathons.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Current Project */}
      <motion.section
        className="py-16 px-6 md:px-20 bg-gradient-to-br from-black to-background"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <div className="bg-background border border-accent rounded-xl p-8 md:p-12 shadow-xl">
          <h2 className="text-3xl font-heading text-primary mb-4">Butterfly Species Classification</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            A machine learning project to classify 49 butterfly species. I merged and balanced two Kaggle datasets to contain 500 images per class.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            I trained the model using 6 ML architectures and selected the most accurate one. The final model is deployed into a modern React-based web UI for real-time predictions.
          </p>
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section
        className="py-16 px-6 md:px-20 bg-background"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-heading text-primary mb-10 text-center">Previous Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-black/70 border border-accent rounded-xl p-6 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold text-accent mb-2">🎓 College Admission Prediction</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              An ML system to predict admission chances based on scores, GPA, and ratings. Built with Python & Flask and visualized using charts.
            </p>
          </div>
          <div className="bg-black/70 border border-accent rounded-xl p-6 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold text-accent mb-2">🛠️ Skill Bridge</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              MERN-based internship & mentoring platform for students. Allowed resumes, internship tracking, and mentor-student communication.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
