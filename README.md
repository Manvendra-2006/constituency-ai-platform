# 🏛️ CivicLoop — AI-Powered Civic Grievance & Rural Development Intelligence Platform

> Transforming citizen complaints into actionable, village-level development intelligence for Members of Parliament — powered by AI, GIS, and real-time civic data.

---

## 📌 Overview

**CivicLoop** (formerly *CivicPulse*) is a full-stack, AI-powered grievance redressal and rural development platform designed to scale across **any constituency in India** — not limited to a single district. It goes beyond traditional complaint-logging systems by combining **Artificial Intelligence, village demographic/infrastructure data, and GIS-based visualization** to help Members of Parliament (MPs) identify problem hotspots, prioritize urgent issues, and make data-driven governance decisions for their respective constituencies.

Citizens can register complaints via **text, voice, or image**, and every complaint is automatically analyzed by AI for category, urgency, and summary — enabling faster resolution and transparent, proactive governance.

---

## ❗ Problem Statement

Traditional grievance systems suffer from:

- Complaints scattered across multiple departments with no unified view
- MPs receiving raw complaints without meaningful insights or prioritization
- No AI-based urgency detection or triage
- No village-level development analysis
- No geographical visualization of problem areas
- Reactive, rather than proactive, decision-making

---

## ✅ Solution

CivicLoop provides an integrated platform where:

- Citizens submit complaints via text, voice, or image
- AI automatically analyzes every complaint (category, urgency, summary)
- Village infrastructure data is merged with live complaint data
- MPs get village-wise development insights and AI recommendations
- Complaint hotspots are visualized on an interactive map
- AI suggests priority development actions and policy recommendations

---

## ✨ Features

### 👤 Citizen Dashboard
- Secure registration & login (JWT-based authentication)
- Complaint submission via **text**, **voice** (Web Speech API), or **image upload**
- Automatic location capture via browser **Geolocation API**
- Real-time complaint tracking — status, AI category, AI summary, urgency level
- Interactive complaint map showing personal & village-wise grievances

### 🏛️ MP Dashboard
- Constituency-wide statistics: total complaints, high-priority count, category-wise distribution
- **Interactive GIS map** (React Leaflet + OpenStreetMap) with village markers and complaint hotspots
- **Village Profile** pages showing infrastructure data (population, schools, health centers, roads, electricity, Anganwadi centers) and complaint register
- **AI Village Analysis** — development score, major issues, priority level, recommendations, future suggestions, top 3 development projects
- **MP AI Insights** — most affected village, most common complaint category, high-urgency count, AI-generated policy recommendations

### 🔐 Dual-Role Authentication
- Separate auth flows and refresh-token cookies for **Citizen** and **MP** roles (`userRefreshToken` / `mpRefreshToken`) via a shared `createAuthMiddleware(role)` factory

---

## 🤖 Artificial Intelligence (Google Gemini API)

| Module | Function |
|---|---|
| **Complaint AI** | Category & subcategory detection, complaint summary, urgency prediction, confidence score. Supports English, Hindi, Hinglish, and other Indian languages |
| **Image AI** | Analyzes uploaded images (road damage, water issues, sanitation, agriculture, infrastructure) alongside complaint text for higher accuracy |
| **Village AI** | Combines demographic + infrastructure + complaint history to generate development score, major issue, recommendations, and top development projects |

---

## 🗺️ GIS-Based Visualization

Implemented using:
- **Leaflet.js**
- **React Leaflet**
- **OpenStreetMap (OSM)**

Displays village-wise markers, complaint hotspots, geographic complaint distribution, and interactive village navigation using latitude/longitude data.

---

## 🛠️ Tech Stack

**Frontend**
- React.js, Tailwind CSS, React Router DOM, Axios
- React Leaflet, react-speech-recognition, react-i18next
- Lucide React (icons)

**Backend**
- Node.js, Express.js
- JWT (authentication), bcrypt.js (password hashing), Multer (file uploads)

**Database**
- MongoDB, Mongoose

**AI**
- Google Gemini API (Gemini 2.5 Flash) — prompt engineering, multimodal AI, NLP

**Maps & GIS**
- Leaflet.js, React Leaflet, OpenStreetMap, Geolocation API

**Deployment**
- Frontend: Vercel
- Backend: Render

---

## 🔄 Workflow

```
Citizen
   │
   ▼
Complaint (Text / Voice / Image)
   │
   ▼
Backend API
   │
   ├──────────► Gemini AI
   │               │
   │               ▼
   │        Complaint Analysis
   │
   ▼
MongoDB
   │
   ▼
Village Data + Complaint Data
   │
   ▼
Village AI Analysis
   │
   ▼
MP Dashboard
   │
   ├── AI Insights
   ├── Village Profile
   ├── Complaint Analytics
   ├── GIS Map
   └── Development Recommendations
```

---

## 🗄️ Database Schema (MongoDB)

- **User Collection** — citizen account information
- **Complaint Collection** — complaint text, image, AI analysis, status, location
- **Village Collection** — population, schools, roads, health centers, latitude/longitude

---

## 📂 Project Structure

```
CivicLoop/
├── client/                 # React frontend (Citizen + MP dashboards)
│   ├── src/
│   │   ├── components/     # ComplaintMap, dashboards, shared UI
│   │   ├── pages/
│   │   ├── context/
│   │   └── utils/
├── server/                 # Node.js + Express backend
│   ├── controllers/
│   ├── models/             # User, Complaint, Village schemas
│   ├── routes/
│   ├── middleware/          # createAuthMiddleware(role)
│   └── utils/               # Gemini AI integration
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Google Gemini API key

### 1. Clone the repository
```bash
[https://github.com/Manvendra-2006/constituency-ai-platform.git]
cd GOVT
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create a `.env` file in `client/`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

```bash
npm run dev
```

---

## 🚀 Key Innovations

- AI-powered multilingual complaint analysis (English, Hindi, Hinglish)
- Voice and image-based complaint submission
- AI-generated village development intelligence
- GIS-based village and complaint visualization
- AI-driven policy recommendations for MPs
- Integration of government demographic data with real-time citizen grievances
- Dual-role authentication for citizens and MPs

---

## 📈 Expected Impact

- Faster grievance resolution
- Data-driven decision-making for MPs
- Better allocation of development funds
- Early identification of village-level issues
- Improved transparency and accountability
- Enhanced citizen participation in governance

---

## 📚 References

| Category | Resource |
|---|---|
| Dataset | [Data.gov.in – Village Demographic & Infrastructure Dataset](https://data.gov.in) |
| AI | [Google Gemini API](https://ai.google.dev) · [Google AI Studio](https://aistudio.google.com) |
| Frontend | [React.js](https://react.dev) · [Tailwind CSS](https://tailwindcss.com) · [Axios](https://axios-http.com) · [React Router](https://reactrouter.com) |
| Backend | [Node.js](https://nodejs.org) · [Express.js](https://expressjs.com) · [Multer](https://github.com/expressjs/multer) |
| Database | [MongoDB](https://www.mongodb.com) · [Mongoose](https://mongoosejs.com) |
| GIS & Mapping | [OpenStreetMap](https://www.openstreetmap.org) · [Leaflet.js](https://leafletjs.com) · [React Leaflet](https://react-leaflet.js.org) |
| Browser APIs | [Geolocation API](https://developer.mozilla.org/docs/Web/API/Geolocation_API) · [Web Speech API](https://developer.mozilla.org/docs/Web/API/Web_Speech_API) |
| Auth & Security | [JWT](https://jwt.io) · [bcrypt.js](https://github.com/kelektiv/node.bcrypt.js) |
| i18n | [react-i18next](https://react.i18next.com) |
| UI | [Lucide React](https://lucide.dev) |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

### One-line Description
> CivicLoop is an AI-powered governance platform that transforms citizen complaints into actionable village-level development intelligence through multilingual AI, GIS-based visualization, and intelligent decision support for Members of Parliament.
