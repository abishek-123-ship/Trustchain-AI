#TrustChain AI — Fake Review Detection System

![TrustChain AI](https://img.shields.io/badge/TrustChain-AI-FFD700?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-FastAPI-009688?style=for-the-badge&logo=python)
![HTML](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-1a56db?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Working%20PoC-00ff88?style=for-the-badge)

> "AI4Dev '26 Hackathon" — PSG College of Technology | Team NeuralCart | PS070063

---

##What is TrustChain AI?

TrustChain AI is a "real-time fake review detection web app" that helps online shoppers
identify fake, paid, and AI-generated product reviews on platforms like Amazon and Flipkart.

Paste any review → AI analyzes 20+ linguistic signals → Instant "FAKE or REAL" verdict
with confidence score and explainable reasons.

---

##The Problem

- '40%' of all online reviews are fake '(BrightLocal, 2023)'
- '68%' of shoppers have been deceived by fake reviews '(BrightLocal, 2023)'
- Only '13%' of shoppers can accurately identify fake reviews '(MIT, 2022)'
- Fake reviews cost businesses '$152 Billion' annually '(World Economic Forum, 2021)'

---

##Features

- Color-reactive search box — turns RED for FAKE, GREEN for REAL
- Confidence score — 0 to 100% with animated bar
- Signal breakdown — shows exactly WHY a review is fake
- Instant detection — results in milliseconds, no API needed
- Works on any platform — Amazon, Flipkart, Meesho, Nykaa, any text
- Glassmorphism UI — 4-section stack scroll with animated stats

---

##How It Works

**20+ Signals Detected:**

| Fake Signals | Real Signals |
|---|---|
| Excessive exclamation marks (3+) | Specific measurements/timeframes |
| ALL CAPS words (3+) | Balanced pros and cons |
| Urgency language (BUY NOW, HURRY) | Long detailed writing (40+ words) |
| Vague superlatives (BEST EVER) | Natural sentence structure |
| Word repetition | Specific product details |
| Emotional openers (WOW!!, OMG!!) | |

---

##Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| UI Style | Glassmorphism + Stack Scroll Animation |
| Backend | Python FastAPI + Uvicorn |
| AI Engine | Rule-based NLP (20+ signals) |
| Fonts | Google Fonts — Syne + DM Sans |
| Deployment | Localhost / Vercel |

---

##Setup & Run

### Prerequisites
- Python 3.8+
- pip

### Installation
```bash
# Clone the repo
git clone https://github.com/abishek-123-ship/Trustchain-AI.git
cd Trustchain-AI

# Install dependencies
cd backend
pip install fastapi uvicorn pydantic

# Start backend
python -m uvicorn main:app --reload
```

###Frontend
Open `index.html` with **Live Server** in VS Code
or just double-click `index.html`

###Test
- Backend runs on: `http://localhost:8000`
- Frontend runs on: `http://localhost:5500`

---

##Project Structure

Trustchain-AI/
├── index.html          # Main frontend
├── style.css           # Glassmorphism UI styles
├── script.js           # Frontend logic + API calls
├── bgbgbg.mp4          # Background video
├── howitworks.jpg      # Workflow image
└── backend/
    ├── main.py         # FastAPI server
    ├── gemini_service.py  # NLP detection engine
    ├── models.py       # Pydantic models
    └── requirements.txt

---

##Test Cases

| Review | Expected | Result |
|---|---|---|
| "BEST PRODUCT EVER!! BUY NOW!! AMAZING!!" | FAKE | ✅ 95% |
| "WOW!! Changed my life!! HIGHLY RECOMMEND!!" | FAKE | ✅ 90% |
| "Good battery ~6hrs. Fan gets loud under load." | REAL | ✅ 88% |
| "Using for 3 months. Keyboard comfortable." | REAL | ✅ 85% |

---

##Team

| Name | Role |
|---|---|
| Abishek Sundar V | Frontend + Backend |
| Rahull U P | Research + Testing |

Team: NeuralCart
Team ID: PS070063
College: PSG College of Technology
Event: AI4Dev '26 Hackathon

---

##Roadmap

- [ ] Chrome Extension for auto-scanning reviews
- [ ] Gemini API integration for deeper analysis
- [ ] Multilingual support (Tamil, Hindi)
- [ ] MongoDB for review history storage
- [ ] Bulk review scanner API

---

##License

MIT License — Free to use for educational purposes.

---

Built with ❤️ for AI4Dev '26 Hackathon — PSG College of Technology
