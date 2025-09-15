# 🍽️ Smart Food Analyzer
**Deep Learning-Based Food Recognition and Dietary Assessment System**

Smart Food Analyzer is a web-based application that uses **Convolutional Neural Networks (CNNs)** to recognize food from images, estimate calories and macronutrients, and list common ingredients. It empowers individuals, nutritionists, and fitness coaches with instant, reliable dietary insights.

---

## 🚀 Features
- 📸 **Food Image Recognition** – Upload a single food image and get instant classification.  
- 🔍 **Nutrient & Calorie Estimation** – Fetch calorie, protein, fat, and carbohydrate values.  
- 🥗 **Ingredient Lookup** – Retrieve a list of common ingredients for the detected meal.  
- 📊 **Interactive Visuals** – Donut charts for macronutrient distribution.  
- 🌐 **Web-based Interface** – Responsive **React** frontend with **TailwindCSS**.  
- ⚡ **Fast & Scalable** – **ExpressJS API** backed by **TensorFlow/Keras** models.  

---

## 🏗️ System Architecture
- **Frontend**: React + TailwindCSS  
- **Backend**: Node.js + ExpressJS REST API  
- **Model Training**: TensorFlow/Keras (Python, trained on Food-101 dataset)  
- **Database Integration**: Nutritionix/Spoonacular API for calorie & macronutrient data  
- **Deployment**: Runs in browser via TensorFlow.js  

---

## 📂 Project Structure
smart-food-analyzer/
│── frontend/ # React + TailwindCSS UI
│── backend/ # ExpressJS REST API
│── model/ # TensorFlow/Keras model training scripts
│── tests/ # Unit, system, and API tests (Jest, Postman)
│── docs/ # Project report & documentation


---

## ⚙️ Installation

### Prerequisites
- Node.js (>= 18)  
- Python (>= 3.9)  
- npm or pnpm  
- API Key from [Spoonacular](https://spoonacular.com/food-api)

### Setup
```bash
# Clone repository
git clone https://github.com/your-username/smart-food-analyzer.git
cd smart-food-analyzer

# Install dependencies
pnpm install    # or npm install

# Backend setup
cd backend
cp .env.example .env   # add your API keys here

# Run backend
pnpm start

# Frontend setup
cd ../frontend
pnpm install
pnpm dev


🖼️ Usage

Open the web app in your browser.

Upload a JPEG/PNG food image.

Select the predicted food class (editable).

Click “Get Nutritional Facts”.

View calories, macronutrients (donut chart), and ingredients instantly.


🧪 Testing

Unit Tests – JestJS for React components.

System Tests – Integration of UI and API.

API Tests – Postman for endpoint validation.

Responsiveness – Tested across devices.

Run tests:
pnpm test


📊 Model Training

Dataset: Food-101

Preprocessing: Resize (224x224), normalization, augmentation

Architecture: CNN with transfer learning (MobileNet, Xception)

Optimizer: Adam (lr=1e-5 tuned for stability)

Target Performance: Accuracy ≥ 80%, Loss ≤ 0.6

Novel Contributions

Domain-specific CNN optimized for food recognition.

Seamless integration of deep learning with real-time web app.

Visual macronutrient breakdown for improved usability.

Open, modular design for easy future extensions.

Future Work

🔗 Multi-label classification for mixed meals.

🌍 Expand dataset to include culturally diverse foods.

🧠 Explore transfer learning with larger models (EfficientNet, ResNet).

📱 Mobile app integration for wider accessibility.
