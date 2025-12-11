# Real-Time Chat Application

A full-stack, real-time chat application built **entirely with JavaScript** — from backend to both frontends.

- Primary frontend: **React** (modern, component-based, hooks)
- Alternative frontend: **Vanilla **HTML + CSS + JavaScript** (zero dependencies, served directly)
- Shared backend: **Node.js + Express + Socket.IO** with REST API and in-memory message store

Both clients are production-ready, fully synchronized in real time, and connect to the exact same server.

**Live Demos**  
React version → https://your-app.vercel.app  
Vanilla version → https://your-app.onrender.com

## Key Features

- Instant bidirectional messaging via WebSockets
- Visual distinction: sent (purple gradient) vs received messages
- Typing indicators with timeout
- Connection status (connected/disconnected)
- System notifications (user joined/left)
- Auto-scroll with smooth behavior
- Fully responsive design
- REST API for messages (`GET / POST / DELETE`)
- Messages persist in memory during server runtime

## Technology Stack (Pure JavaScript Only)

| Layer              | Technologies                              | Dependencies       |
|--------------------|-------------------------------------------|--------------------|
| Backend            | Node.js, Express, Socket.IO               | `express`, `socket.io`, `cors`, `dotenv` |
| React Frontend     | React 18, socket.io-client                | `socket.io-client` |
| Vanilla Frontend   | Plain HTML, CSS, JavaScript               | None               |
| Storage            | In-memory array (mock database)           | —                  |

**Zero TypeScript. Zero heavy frameworks. Only 4 npm packages total.**

## Project Structure
├── frontend/              # React client
│   └── src/
├── public/                # Vanilla client (served at root)
│   ├── index.html
│   └── styles.css
├── controllers/           # Message logic
├── routes/                # Express routes
├── server.js              # Unified backend
├── package.json
└── .env.example


## Running Locally

```bash
# Start backend (serves vanilla client + Socket.IO + API)
node server.js
# → Vanilla client: http://localhost:5000

# Run React version (optional)
cd frontend
npm install
npm start
# → React client: http://localhost:3000
