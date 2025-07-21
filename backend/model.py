import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

NUM_CLASSES = 49

BUTTERFLY_CLASSES = [
    "ADONIS",
    "AFRICAN GIANT SWALLOWTAIL",
    "AMERICAN SNOOT",
    "AN 88",
    "APPOLLO",
    "ARCIGERA FLOWER MOTH",
    "ATALA",
    "ATLAS MOTH",
    "BANDED ORANGE HELICONIAN",
    "BANDED PEACOCK",
    "BANDED TIGER MOTH",
    "BECKERS WHITE",
    "BIRD CHERRY ERMINE MOTH",
    "BLACK HAIRSTREAK",
    "BLUE MORPHO",
    "BLUE SPOTTED CROW",
    "BROOKES BIRDWING",
    "BROWN ARGUS",
    "BROWN SIPROETA",
    "CABBAGE WHITE",
    "CAIRNS BIRDWING",
    "CHALK HILL BLUE",
    "CHECQUERED SKIPPER",
    "CHESTNUT",
    "CINNABAR MOTH",
    "CLEARWING MOTH",
    "CLEOPATRA",
    "CLODIUS PARNASSIAN",
    "CLOUDED SULPHUR",
    "COMET MOTH",
    "COMMON BANDED AWL",
    "COMMON WOOD-NYMPH",
    "COPPER TAIL",
    "CRECENT",
    "CRIMSON PATCH",
    "DANAID EGGFLY",
    "EASTERN COMA",
    "EASTERN DAPPLE WHITE",
    "EASTERN PINE ELFIN",
    "ELBOWED PIERROT",
    "EMPEROR GUM MOTH",
    "GARDEN TIGER MOTH",
    "GIANT LEOPARD MOTH",
    "GLITTERING SAPPHIRE",
    "GOLD BANDED",
    "GREAT EGGFLY",
    "GREAT JAY",
    "GREEN CELLED CATTLEHEART",
    "GREEN HAIRSTREAK",
    "GREY HAIRSTREAK",
    "HERCULES MOTH",
    "HUMMING BIRD HAWK MOTH",
    "INDRA SWALLOW",
    "IO MOTH",
    "IPHICLUS SISTER",
    "JULIA",
    "LARGE MARBLE",
    "LUNA MOTH",
    "MADAGASCAN SUNSET MOTH",
    "MALACHITE",
    "MANGROVE SKIPPER",
    "MESTRA",
    "METALMARK",
    "MILBERTS TORTOISESHELL",
    "MONARCH",
    "MOURNING CLOAK",
    "OLEANDER HAWK MOTH",
    "ORANGE OAKLEAF",
    "ORANGE TIP",
    "ORCHARD SWALLOW",
    "PAINTED LADY",
    "PAPER KITE",
    "PEACOCK",
    "PINE WHITE",
    "PIPEVINE SWALLOW",
    "POLYPHEMUS MOTH",
    "POPINJAY",
    "PURPLE HAIRSTREAK",
    "PURPLISH COPPER",
    "QUESTION MARK",
    "RED ADMIRAL",
    "RED CRACKER",
    "RED POSTMAN",
    "RED SPOTTED PURPLE",
    "ROSY MAPLE MOTH",
    "SCARCE SWALLOW",
    "SILVER SPOT SKIPPER",
    "SIXSPOT BURNET MOTH",
    "SLEEPY ORANGE",
    "SOOTYWING",
    "SOUTHERN DOGFACE",
    "STRAITED QUEEN",
    "TROPICAL LEAFWING",
    "TWO BARRED FLASHER",
    "ULYSES",
    "VICEROY",
    "WHITE LINED SPHINX MOTH",
    "WOOD SATYR",
    "YELLOW SWALLOW TAIL",
    "ZEBRA LONG WING"
]


def get_transform():
    return transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

def load_checkpoint(model, model_path):
    checkpoint = torch.load(model_path, map_location=torch.device('cpu'))
    model.load_state_dict(checkpoint['model_state_dict'] if isinstance(checkpoint, dict) and 'model_state_dict' in checkpoint else checkpoint)
    
    # ✅ Always override with real butterfly names
    class_names = BUTTERFLY_CLASSES
    model.eval()
    return model, class_names

# ✅ Default ResNet18
def load_model_resnet18(model_path="models/butterfly_resnet18.pth"):
    model = models.resnet18(pretrained=False)
    model.fc = nn.Linear(model.fc.in_features, NUM_CLASSES)
    return load_checkpoint(model, model_path)

# ✅ VGG19
def load_model_vgg19(model_path="models/butterfly_VGG19.pth"):
    model = models.vgg19(pretrained=False)
    model.classifier[6] = nn.Linear(model.classifier[6].in_features, NUM_CLASSES)
    return load_checkpoint(model, model_path)

# ✅ VGG16
def load_model_vgg16(model_path="models/butterfly_VGG16.pth"):
    model = models.vgg16(pretrained=False)
    model.classifier[6] = nn.Linear(model.classifier[6].in_features, NUM_CLASSES)
    return load_checkpoint(model, model_path)

# ✅ DenseNet
def load_model_densenet(model_path="models/butterfly_densenet.pth"):
    model = models.densenet121(pretrained=False)
    model.classifier = nn.Linear(model.classifier.in_features, NUM_CLASSES)
    return load_checkpoint(model, model_path)

# ✅ EfficientNet
def load_model_efficientnet(model_path="models/butterfly_Efficient.pth"):
    model = models.efficientnet_b0(pretrained=False)
    model.classifier[1] = nn.Linear(model.classifier[1].in_features, NUM_CLASSES)
    return load_checkpoint(model, model_path)

def predict_image(model, image: Image.Image, class_names):
    transform = get_transform()
    tensor = transform(image).unsqueeze(0)
    with torch.no_grad():
        outputs = model(tensor)
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
        confidence, predicted = torch.max(probabilities, 0)
    return class_names[predicted.item()], confidence.item()
