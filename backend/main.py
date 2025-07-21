import io
import requests
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image

# ✅ Import loaders
from model import (
    load_model_resnet18,
    load_model_vgg16,  # ✅ ADD THIS
    load_model_vgg19,
    load_model_densenet,
    load_model_efficientnet,
    predict_image
)

app = FastAPI()

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Available models mapping
MODEL_LOADERS = {
    "resnet18": load_model_resnet18,
    "vgg16": load_model_vgg16,  # ✅ ADD THIS
    "vgg19": load_model_vgg19,
    "densenet": load_model_densenet,
    "efficientnet": load_model_efficientnet,
}

# ✅ Cache for loaded models (so we don’t reload each time)
loaded_models = {}

def get_description_fuzzy(query):
    try:
        search = requests.get(
            f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={query}&format=json"
        ).json()
        search_results = search["query"]["search"]
        if not search_results:
            return "No matching article found on Wikipedia."
        title = search_results[0]["title"]
        page = requests.get(
            f"https://en.wikipedia.org/api/rest_v1/page/summary/{title.replace(' ', '_')}"
        ).json()
        return page.get("extract", "No description found.")
    except Exception as e:
        print("Wikipedia fetch error:", e)
        return "Failed to fetch description."

# ✅ Predict with chosen model
@app.post("/predict/{model_name}")
async def predict_with_model(model_name: str, file: UploadFile = File(...)):
    # Validate model
    if model_name not in MODEL_LOADERS:
        return JSONResponse(status_code=400, content={"error": f"Invalid model name. Choose from {list(MODEL_LOADERS.keys())}"})

    # Validate image
    if not file.content_type.startswith("image"):
        return JSONResponse(status_code=400, content={"error": "Invalid file type. Please upload an image."})

    # Load image
    image_bytes = await file.read()
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except Exception:
        return JSONResponse(status_code=400, content={"error": "Invalid image file."})

    # ✅ Load model lazily (first time only)
    if model_name not in loaded_models:
        model, class_names = MODEL_LOADERS[model_name]()
        loaded_models[model_name] = (model, class_names)
    else:
        model, class_names = loaded_models[model_name]

    # ✅ Predict
    prediction, confidence = predict_image(model, image, class_names)

    # ✅ Confidence threshold
    if confidence < 0.6:
        return {
            "result": "Not a butterfly",
            "confidence": confidence * 100,
            "description": "Low confidence in prediction."
        }

    description = get_description_fuzzy(prediction)

    return {
        "result": prediction,
        "confidence": confidence * 100,
        "description": description
    }

# ✅ Optional default endpoint using ResNet18
@app.post("/predict")
async def predict_default(file: UploadFile = File(...)):
    return await predict_with_model("resnet18", file)
