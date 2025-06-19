# URL Shortener Application

A full-stack URL shortener built with a React + Vite frontend and a Node.js + Express + MongoDB backend.

---

## Features
- **Shorten URLs:** Enter a long URL and receive a shortened version.
- **Redirection:** Visiting a short URL redirects to the original URL.
- **Click Tracking:** Each visit to a short URL increments a click counter (tracked in the backend).
- **Duplicate Prevention:** The same original URL always returns the same short URL.
- **Modern UI:** Built with React, TailwindCSS, and Vite for fast, responsive UX.

---

## Project Structure

```
part 2/
├── backend/
│   ├── .env                # Environment variables (MongoDB URI)
│   ├── index.js            # Main backend logic (Express server, API, MongoDB)
│   ├── package.json        # Backend dependencies
│   └── ...
└── frontend/
    ├── index.html          # App entry point
    ├── src/
    │   ├── App.jsx         # Main React component (UI, API calls)
    │   ├── main.jsx        # React entry point
    │   └── ...
    ├── tailwind.config.js  # TailwindCSS config
    ├── vite.config.js      # Vite config
    ├── package.json        # Frontend dependencies
    └── ...
```

---

## Backend Details (`backend/`)
- **Stack:** Node.js, Express, MongoDB (via Mongoose)
- **API Endpoints:**
  - `POST /api/shorten` — Accepts `{ originalUrl }` and returns `{ shortUrl }`.
  - `GET /:shortId` — Redirects to the original URL and increments click count.
- **Environment:**
  - Set MongoDB URI in `.env` as `MONGODB_URI=mongodb://localhost:27017/urlshortener` (or your own URI).

### Running the Backend
```bash
cd backend
npm install
node index.js # or nodemon index.js
```

---

## Frontend Details (`frontend/`)
- **Stack:** React, Vite, TailwindCSS
- **Main Component:** `App.jsx` handles the form, API call, and displays the short URL or errors.
- **API Usage:**
  - Calls `POST http://localhost:5000/api/shorten` with the entered URL.
  - Shows the generated short URL as a clickable link.

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Usage
1. **Start MongoDB** (locally or via a cloud provider like Atlas).
2. **Start the backend server:** See above.
3. **Start the frontend dev server:** See above.
4. **Open the frontend app** in your browser (usually at `http://localhost:5173`).
5. **Enter a URL** to shorten, submit, and receive a short link.

---

## Environment Variables Example (`backend/.env`)
```
MONGODB_URI=mongodb://localhost:27017/urlshortener
```

---

## Dependencies
- **Backend:** express, mongoose, nanoid, cors, dotenv
- **Frontend:** react, vite, tailwindcss

---

## Notes
- Make sure your MongoDB instance is running and accessible.
- The frontend expects the backend to run on `http://localhost:5000` by default.
- You can customize ports and MongoDB URI as needed.

---

## License
MIT
