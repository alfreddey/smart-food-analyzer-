# smart-food-analyzer-
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
