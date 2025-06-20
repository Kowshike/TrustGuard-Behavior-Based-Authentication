
# TrustGuard: Behavior-Based Continuous Authentication System

A prototype web application simulating continuous user authentication for mobile banking based on behavioral and environmental factors.
Developed for HackerEarth Hackathon under the theme "Enhancing Mobile Banking Security through Behavior-Based Continuous Authentication".


## Demo

https://trust-guard.netlify.app/


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://portfolio-kowshik.netlify.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kowshik-emmadisetty-3a7874248/)


## Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/your-username/TrustGuard.git


```

## Features

✅ Core Features
1. Behavior-Based Continuous Authentication
Uses simulated environmental and behavioral sensor data to calculate user trustworthiness in real-time.

🔍 Frontend Features (React + TypeScript + Vite)
1. Sensor Control Simulation (SensorControls.tsx)
Simulate 4 key inputs:

Sound Level (0–100)

Light Intensity (0–100)

Tilt Angle (-90 to +90)

Motion Status (Static | Walking | Running)

On value change → Sends data to FastAPI backend via POST request.

2. Trust Score Display (TrustScoreDisplay.tsx)
Visual real-time Trust Score Meter (0-100).

Graphical representation (progress bar/circular bar).

3. Anomaly Alert System (AnomalyAlert.tsx)
Displays:

✅ “All Good” if Trust Score ≥ 60.

⚠️ “Suspicious Activity Detected” if Trust Score < 60.

Color-coded feedback (Green/Red).

4. Session Monitoring (SessionInfo.tsx)
Shows:

Session Start Time.

Elapsed Time (updated live using useEffect).

5. ML Dashboard (MLDashboard.tsx)
Central screen combining:


TrustScoreDisplay

AnomalyAlert

SessionInfo

Clean, responsive, modern UI using Tailwind CSS + shadcn/ui components.

## 📊 Visualization Features
Dynamic Trust Score Visualization (Circular/Linear bar).

Color-Coded Alerts (Green/Red) based on the Trust Score.

Live Session Timer.



## 🛠️ Tech Stack

💻 Tech Stack Requirements:
Frontend: React.js + TypeScript + Vite + Tailwind CSS

Backend: FastAPI (Python 3.11+)

Styling: Tailwind CSS (configured via tailwind.config.ts)

Build/Dev: Vite

Components: Shadcn/UI components for reusable UI

State: React state hooks

Communication: Axios/Fetch between React frontend and FastAPI backend

CORS: Enabled in backend to allow local frontend access (http://localhost:3000)

No database storage required (in-memory simulation only)



## 🧩 Trust Score Logic (Sample)

| **Factor**      | **Normal Range** | **Penalty Applied**                 |
|----------------|-----------------|------------------------------------|
| Speed          | ≤ 30 km/h        | -20 if exceeded                    |
| Acceleration   | ≤ 10 m/s²        | -15 if exceeded                    |
| Brightness     | 10–90 lux        | -10 if outside range               |
| Temperature    | 10–45°C          | -10 if outside range               |
| Heart Rate     | 50–120 bpm       | -10 if outside range               |

**Note:** Final score is clamped between **0 – 100**.

## 💡 Future Enhancements
Real ML anomaly detection using LSTM/Autoencoders.

Sensor data fetching from real mobile devices (Gyroscope, GPS).

User authentication & persistent sessions.

Integration with mobile banking apps.


## ⚠️ Constraints:
No actual mobile sensor data (simulation only)

No DB storage

No real ML — simple rule-based scoring.

## Authors

- [Emmadisetty Kowshik](https://www.linkedin.com/in/kowshik-emmadisetty-3a7874248/)


## License

[This project is licensed under the MIT License.](https://choosealicense.com/licenses/mit/)

