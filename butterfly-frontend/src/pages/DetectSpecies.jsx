import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaUpload, FaSpinner } from "react-icons/fa";
import { MdOutlineSearch, MdDownload } from "react-icons/md";
import { Link } from "react-router-dom";

export default function DetectSpecies() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMoreModels, setShowMoreModels] = useState(false);

  const [autoPopupDisabled, setAutoPopupDisabled] = useState(false); // ✅ Stop after close

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setDescription(null);
    }
  };

  const handlePredict = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);
    setDescription(null);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        "http://localhost:8000/predict",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const { result: predictedClass, confidence, description } = response.data;
      setResult(`${predictedClass} (${confidence.toFixed(2)}%)`);
      setDescription(description);
    } catch (error) {
      setResult("Prediction failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob(
      [`Species: ${result}\nDescription: ${description}`],
      { type: "text/plain;charset=utf-8" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prediction.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ✅ Auto-show modal every 6 seconds
  useEffect(() => {
    if (autoPopupDisabled) return; // Stop if user closed manually

    const interval = setInterval(() => {
      setShowMoreModels(true);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoPopupDisabled]);

  const handleCloseModal = () => {
    setShowMoreModels(false);
    setAutoPopupDisabled(true); // Stop future auto popups
  };

  return (
    <div className="bg-background text-text w-full relative">
      {/* HEADER */}
      <motion.section
        className="min-h-[30vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-background via-black to-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.h1
          className="text-3xl md:text-5xl font-heading font-bold text-primary leading-tight"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🦋 Detect Butterfly Species
        </motion.h1>

        <motion.p
          className="text-sm md:text-lg max-w-2xl text-gray-300 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Upload a butterfly image and let{" "}
          <span className="text-primary font-semibold">ButterflyVerse</span> do the rest.
        </motion.p>
      </motion.section>

      {/* DETECTION SECTION */}
      <motion.section
        id="detection"
        className="min-h-[70vh] w-full bg-black px-4 md:px-10 py-10 flex justify-center items-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
          {/* Upload Box */}
          <div className="bg-black/70 border border-accent rounded-xl shadow-lg p-6 flex flex-col justify-between">
            <label className="flex flex-col items-center cursor-pointer">
              <FaUpload className="text-4xl text-accent mb-2" />
              <span className="text-lg font-medium text-accent mb-2">
                Choose Image
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>

            {preview && (
              <motion.img
                key={preview}
                src={preview}
                alt="Preview"
                className="w-full h-auto max-h-[220px] object-contain border border-accent my-6 rounded-lg"
                initial={{ opacity: 0.4, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              />
            )}

            <button
              onClick={handlePredict}
              disabled={!image || loading}
              className={`mt-2 px-6 py-3 bg-accent text-black font-semibold hover:bg-hover transition-all duration-300 border border-accent rounded-full ${
                !image || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <MdOutlineSearch />
                )}
                {loading ? "Predicting..." : "Predict Species"}
              </div>
            </button>
          </div>

          {/* Result Box */}
          <div className="bg-black/70 border border-accent rounded-xl shadow-lg p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                🧬 Prediction Result
              </h3>

              <div className="text-base text-gray-300 min-h-[120px] flex flex-col items-center justify-center text-center">
                {loading ? (
                  <div className="flex items-center gap-2 text-accent text-lg animate-pulse">
                    <FaSpinner className="animate-spin" /> Predicting...
                  </div>
                ) : result ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full space-y-4"
                  >
                    <p className="text-xl font-bold text-accent">{result}</p>

                    <div className="bg-background border border-accent/50 p-4 rounded-lg text-left">
                      <p>
                        <strong>🦋 Species Name:</strong>{" "}
                        <span className="text-primary">
                          {result?.split("(")[0]}
                        </span>
                      </p>
                      <p>
                        <strong>🔍 Confidence:</strong>{" "}
                        <span className="text-primary">
                          {result?.split("(")[1]?.replace(")", "")}
                        </span>
                      </p>
                      <p>
                        <strong>📖 Description:</strong> {description || "No description available."}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <p className="text-gray-400">
                    Upload an image and click <strong>"Predict Species"</strong> to see the result.
                  </p>
                )}
              </div>
            </div>

            {result && (
              <button
                onClick={handleDownload}
                className="mt-6 px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-black transition-all duration-300 rounded-full"
              >
                <div className="flex items-center justify-center gap-2">
                  <MdDownload /> Download Prediction
                </div>
              </button>
            )}
          </div>
        </div>
      </motion.section>

      {/* --- AUTO POPUP MODAL --- */}
      <AnimatePresence>
        {showMoreModels && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900/90 to-black/95 border border-accent rounded-2xl shadow-2xl p-8 max-w-md text-center relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-extrabold text-primary drop-shadow mb-4">
                🚀 Want More Accuracy?
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Try **other AI models** to compare results and get better predictions.
              </p>

              {/* CTA LINK */}
              <Link
                to="/models"
                className="inline-block px-8 py-3 bg-accent text-black font-bold rounded-full shadow-lg hover:bg-hover transition-all duration-300"
              >
                🔄 Try with More Models
              </Link>

              {/* Close Btn */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
