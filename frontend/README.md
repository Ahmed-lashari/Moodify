# Moodify Frontend

A React-based web application that analyzes song lyrics and visualizes their emotional mood with interactive charts.

## 📁 Project Structure

```
frontend/
├── public/
├── src/
│   ├── apis/
│   │   ├── get.js           # GET request to backend
│   │   └── post.js          # POST request for predictions
│   ├── pages/
│   │   ├── LandingPage.jsx  # Hero/welcome page
│   │   ├── InputPage.jsx    # Lyrics input form
│   │   ├── LoadingPage.jsx  # Loading animation
│   │   └── ResultPage.jsx   # Results with charts
│   ├── utils/
│   │   ├── moodConfig.js         # Mood colors & emojis
│   │   └── mockDataGenerator.js  # Mock data for testing
│   ├── App.jsx              # Main component & routing
│   ├── index.css            # Tailwind CSS imports
│   └── index.jsx            # React entry point
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Backend URL

The app expects the backend at `http://localhost:8000`. If your backend runs on a different port, update the URLs in:
- `src/apis/get.js`
- `src/apis/post.js`

### 3. Start Development Server

```bash
npm start
```

Frontend will be available at: **http://localhost:3000**

## 🎨 Pages & Flow

### 1. **Landing Page** (`LandingPage.jsx`)
- Hero section with animated background
- Feature cards showcasing app capabilities
- "Start Analyzing" CTA button

### 2. **Input Page** (`InputPage.jsx`)
- Textarea for lyrics input
- Real-time word count validation (minimum 5 words)
- Submit button to trigger analysis

### 3. **Loading Page** (`LoadingPage.jsx`)
- Animated loading screen
- Progress steps visualization
- Displays while backend processes lyrics

### 4. **Result Page** (`ResultPage.jsx`)
- Main mood prediction with emoji and confidence
- **Pie Chart**: Mood distribution across emotions
- **Line Chart**: Sentiment flow throughout lyrics
- **Bar Chart**: Top keywords frequency
- Statistics cards (word count, unique words, avg length)
- Original lyrics display

## 📊 Features

### Interactive Charts
Built with **Recharts** library:
- 📈 **Line Chart** - Sentiment timeline
- 🥧 **Pie Chart** - Mood distribution
- 📊 **Bar Chart** - Word frequency

### Mood Types
The app recognizes these moods:
- 😊 **Happy** - Yellow/Orange gradient
- 😢 **Sad** - Gray gradient
- 😠 **Angry** - Red gradient
- 😌 **Calm** - Cyan/Blue gradient
- ⚡ **Energetic** - Orange/Pink gradient
- 💕 **Romantic** - Pink/Rose gradient

### Responsive Design
- Mobile-friendly layout
- Tailwind CSS styling
- Smooth animations and transitions

## 🔧 Key Files Explained

| File | Purpose |
|------|---------|
| `App.jsx` | Main component managing page state and navigation |
| `apis/post.js` | Sends lyrics to backend for prediction |
| `apis/get.js` | Health check endpoint for backend |
| `moodConfig.js` | Mood definitions (colors, emojis, gradients) |
| `mockDataGenerator.js` | Generates fake data for UI testing |

## 🧪 Testing Mode

The app includes a **Mock Data Toggle** (top-right corner) for development:

```javascript
// Enable in App.jsx
const [useMockData, setUseMockData] = useState(false);
```

**When enabled:**
- ✅ No backend required
- ✅ Instant results
- ✅ Test all UI components
- ✅ Perfect for frontend development

**When disabled:**
- ✅ Real API calls to backend
- ✅ Actual ML predictions
- ✅ Production-ready flow

## 📡 API Integration

### Backend Expected Response

```json
{
  "mood": "happy",
  "lyrics": "Your lyrics here...",
  "success": true
}
```

### Frontend Transformation

The app enhances backend response with:
- Confidence score
- Chart data (mood distribution, sentiment timeline)
- Word frequency analysis
- Text statistics

This is handled in `App.jsx` → `transformBackendResponse()`

## 🛠️ Dependencies

```json
{
  "react": "^18.x",
  "recharts": "^2.x",
  "tailwindcss": "^3.x"
}
```

### Key Libraries:
- **React** - UI framework
- **Recharts** - Chart visualizations
- **Tailwind CSS** - Utility-first styling

## 🎯 Usage Flow

1. **User lands on homepage** → Clicks "Start Analyzing"
2. **User enters lyrics** → Minimum 5 words required
3. **Click "Analyze Mood"** → POST request to backend
4. **Loading screen** → Shows processing steps
5. **Results displayed** → Charts, stats, and mood prediction

## 🔗 Connecting to Backend

### Before Starting Frontend:

```bash
# Terminal 1 - Start Backend
cd backend
uvicorn app.main:app --reload
```

```bash
# Terminal 2 - Start Frontend
cd frontend
npm start
```

### CORS Configuration

Backend must allow frontend origin. Check `backend/app/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🐛 Troubleshooting

### Backend connection fails?
- Ensure backend is running on `http://localhost:8000`
- Check browser console for CORS errors
- Verify backend `/health` endpoint is accessible

### Charts not showing?
- Check if `recharts` is installed: `npm install recharts`
- Verify data structure matches chart requirements
- Use mock data toggle to test with sample data

### Styling issues?
- Run: `npm run build` to rebuild Tailwind
- Check `tailwind.config.js` for proper paths
- Verify `index.css` imports Tailwind directives

### Build errors?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📦 Production Build

```bash
npm run build
```

Creates optimized production build in `build/` folder.

### Deploy
```bash
# Serve production build
npx serve -s build
```

## 🎨 Customization

### Add New Moods

Edit `utils/moodConfig.js`:

```javascript
export const MOODS = {
  excited: {
    emoji: "🤩",
    color: "#FFA500",
    gradient: "from-yellow-500 to-orange-600",
  },
  // ... other moods
};
```

### Change Color Scheme

Update Tailwind config in `tailwind.config.js` or use inline classes in components.

### Modify Animations

Edit animation classes in component JSX or add custom animations in `index.css`.

## 📱 Mobile Responsiveness

All pages are responsive:
- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)

Breakpoints managed by Tailwind CSS `sm:`, `md:`, `lg:` classes.

## 🚀 Next Steps

1. ✅ Test with mock data enabled
2. ✅ Connect to backend and test real predictions
3. 🔄 Enhance backend to provide chart data
4. 🔄 Add user authentication (optional)
5. 🔄 Deploy to production

## 💡 Tips

- Use **mock data toggle** during frontend development
- Check browser **console** for API errors
- Test with various lyrics lengths (short, medium, long)
- Verify backend is running before disabling mock mode

---

**Made with ❤️ for visualizing music emotions**