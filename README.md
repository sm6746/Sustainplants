# Plant Disease Detection System for Sustainable Agriculture

This project implements a deep learning-based system for detecting plant diseases from images, helping farmers and agricultural professionals maintain healthy crops through early disease detection.

## 🌟 Features

- Interactive web interface built with Streamlit
- Real-time plant disease detection
- Support for multiple crop types and diseases
- Easy-to-use image upload and prediction system
- Pre-trained deep learning model for accurate disease classification

## 🔍 Supported Plants and Diseases

The system can detect various diseases in the following plants:
- Apple (Apple scab, Black rot, Cedar apple rust, Healthy)
- Blueberry (Healthy)
- Cherry (Powdery mildew, Healthy)
- Corn/Maize (Cercospora leaf spot, Common rust, Northern Leaf Blight, Healthy)
- Grape (Black rot, Esca, Leaf blight, Healthy)
- Orange (Haunglongbing/Citrus greening)
- Peach (Bacterial spot)
And more...

## 🛠️ Technical Stack

- **Frontend**: Streamlit
- **Backend**: Python
- **Deep Learning Framework**: TensorFlow, Keras
- **Image Processing**: OpenCV, Pillow
- **Data Analysis**: NumPy, Pandas
- **Visualization**: Matplotlib, Seaborn

## ⚙️ Requirements

```
numpy
pickle-mixin
streamlit
seaborn
pandas
matplotlib
scikit_learn
tensorflow
keras
opencv_python_headless
```

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/sm6746/Sustainplants.git
cd Sustainplants
```

2. Install the required dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
streamlit run main.py
```

## 📱 Usage

1. Launch the application
2. Navigate to the "DISEASE RECOGNITION" page from the sidebar
3. Upload an image of a plant leaf
4. Click "Show Image" to verify your upload
5. Click "Predict" to get the disease detection results

## 🏗️ Project Structure

- `main.py` - Main application file with Streamlit interface
- `trained_plant_disease_model.keras` - Pre-trained deep learning model
- `requirements.txt` - Project dependencies
- `Test_plant_disease.ipynb` - Notebook for testing the model
- `Train_plant_disease.ipynb` - Notebook for training the model

## 👥 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/sm6746/Sustainplants/issues).

## 📄 License

[MIT License](LICENSE)

## 🙏 Acknowledgments

- Thanks to all contributors who helped in building this sustainable agriculture solution
- Special thanks to the deep learning and agriculture community for their valuable resources