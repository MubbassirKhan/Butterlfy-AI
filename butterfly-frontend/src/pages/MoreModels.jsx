import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaUpload, FaSpinner } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";

export default function MoreModels() {
  const [selectedModel, setSelectedModel] = useState(""); // default empty
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [description, setDescription] = useState(null);
  const [loadingStage, setLoadingStage] = useState(""); // multi-stage loading
  const [loading, setLoading] = useState(false);

  // ✅ Available models
  const models = [
    { value: "", label: "Select Model" },
    { value: "resnet18", label: "ResNet18" },
    { value: "vgg19", label: "VGG19" },
    { value: "vgg16", label: "VGG16" },
    { value: "densenet", label: "DenseNet" },
    { value: "efficientnet", label: "EfficientNet" },
  ];

  // ✅ Simulated multi-step loading messages
  const loadingMessages = [
    "🔄 Initializing model…",
    "📸 Processing image…",
    "🧠 Running inference…",
    "📑 Generating prediction report…",
  ];

  // Change loading stages every 1s while loading
  useEffect(() => {
    if (!loading) return;
    let step = 0;
    setLoadingStage(loadingMessages[step]);
    const interval = setInterval(() => {
      step++;
      if (step < loadingMessages.length) {
        setLoadingStage(loadingMessages[step]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [loading]);

  // ✅ Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setDescription(null);
    }
  };

  // ✅ Handle Prediction Request
  const handlePredict = async () => {
    if (!image || !selectedModel) return;
    setLoading(true);
    setLoadingStage(loadingMessages[0]); // start loading
    setResult(null);
    setDescription(null);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        `http://localhost:8000/predict/${selectedModel}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { result: predictedClass, confidence, description } = response.data;
      setResult(`${predictedClass} (${confidence.toFixed(2)}%)`);
      setDescription(description);
    } catch (error) {
      setResult("❌ Prediction failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const canPredict = image && selectedModel !== "" && !loading;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center py-12 px-6">
      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold text-center mb-10 tracking-wide"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        🦋 Butterfly Species Detection <br />
        <span className="text-accent">with Multiple AI Models</span>
      </motion.h1>

      {/* Layout Split */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT: Model Selector + Upload */}
        <motion.div
          className="bg-black/70 border border-gray-700 rounded-2xl p-8 shadow-lg flex flex-col justify-between"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Model Selector */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              🧬 Select Model:
            </label>
            <select
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {models.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Section */}
          <div className="flex flex-col items-center border-2 border-dashed border-accent/50 rounded-xl p-6 hover:border-accent transition">
            <label className="flex flex-col items-center cursor-pointer">
              <FaUpload className="text-4xl text-accent mb-2" />
              <span className="text-lg font-medium text-accent">
                Choose Butterfly Image
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>

            {/* Preview */}
            {preview && (
              <motion.img
                key={preview}
                src={preview}
                alt="Preview"
                className="w-full mt-4 rounded-xl border border-accent"
                initial={{ opacity: 0.4, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              />
            )}
          </div>

          {/* Predict Button */}
          <button
            onClick={handlePredict}
            disabled={!canPredict}
            className={`mt-6 w-full py-3 rounded-full text-black font-semibold transition-all duration-300 ${
              canPredict
                ? "bg-accent hover:bg-hover"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <MdOutlineSearch />
              )}
              {loading
                ? "Predicting..."
                : selectedModel
                ? `Predict with ${selectedModel.toUpperCase()}`
                : "Select Model First"}
            </div>
          </button>
        </motion.div>

        {/* RIGHT: Results */}
        <motion.div
          className="bg-black/70 border border-gray-700 rounded-2xl p-8 shadow-lg min-h-[300px]"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-primary mb-4 text-center">
            🧪 Prediction Result
          </h2>

          {/* LOADING STATE */}
          {loading && (
            <motion.div
              className="flex flex-col items-center justify-center text-center space-y-4 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <FaSpinner className="text-accent animate-spin text-4xl" />
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingStage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-accent text-lg font-medium"
                >
                  {loadingStage}
                </motion.p>
              </AnimatePresence>
              <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}

          {/* RESULT STATE */}
          {!loading && result ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xl font-semibold text-accent text-center">
                ✅ {result}
              </p>

              <div className="mt-6 p-4 rounded-lg bg-gray-800/70 border border-accent/30">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.div>
          ) : null}

          {/* DEFAULT EMPTY STATE */}
          {!loading && !result && (
            <p className="text-gray-400 text-center">
              Select a model, upload an image, and click predict to see results.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
