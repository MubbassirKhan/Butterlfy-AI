import { useState } from "react";
import { motion } from "framer-motion";
import { MdEmail, MdMessage, MdSend, MdPerson } from "react-icons/md";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now just simulate submission (can connect to backend/mail service later)
    console.log("Form submitted:", form);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-black text-text py-16 px-6 md:px-12">
      <motion.div
        className="max-w-3xl mx-auto bg-black/60 p-8 border border-accent rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
          📬 Contact Us
        </h2>

        <p className="text-gray-400 text-center mb-8">
          Have questions, suggestions, or feedback? Reach out and we'll get back to you!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-3 bg-background border border-accent rounded-lg px-4 py-2">
            <MdPerson className="text-accent text-xl" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="bg-transparent outline-none text-text w-full"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-3 bg-background border border-accent rounded-lg px-4 py-2">
            <MdEmail className="text-accent text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="bg-transparent outline-none text-text w-full"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-start gap-3 bg-background border border-accent rounded-lg px-4 py-2">
            <MdMessage className="text-accent text-xl mt-1" />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              className="bg-transparent outline-none text-text w-full resize-none"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-black font-semibold py-3 px-6 rounded-full flex justify-center items-center gap-2 hover:bg-hover transition-all"
          >
            <MdSend />
            Send Message
          </button>
        </form>

        {submitted && (
          <motion.p
            className="text-green-400 mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ✅ Message sent successfully!
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
