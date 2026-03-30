## 🌟 Features

### ✨ What This App Can Do

- 🎥 **Real-Time Video Calls**  
  Seamless face-to-face collaboration using WebRTC via Stream.io.

- 💬 **Live Chat During Sessions**  
  Chat alongside video calls without switching tools.

- 🧑‍💻 **In-Browser Code Editor**  
  Monaco Editor with syntax highlighting for JavaScript, Python, and Java.

- ▶️ **Run Code Instantly**  
  Execute code securely using the Piston API (sandboxed execution).

- 🧩 **Session Management**  
  Create, join, and end coding sessions with proper access control.

- 📚 **Built-in Problem Library**  
  Includes 5 curated coding challenges with test cases to practice during sessions.

- 🔐 **Authentication & User Management**  
  Secure login and session handling using Clerk.

- 📱 **Responsive UI**  
  Fully mobile-friendly design built with Tailwind CSS and DaisyUI.

---

## 🏗️ Architecture
```text
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                     │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────────┐ │
│  │  React   │  │  Monaco  │  │  Stream Video/Chat    │ │
│  │  Router  │  │  Editor  │  │  (WebRTC)             │ │
│  └──────────┘  └──────────┘  └───────────────────────┘ │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS
                       ↓
┌─────────────────────────────────────────────────────────┐
│              EXPRESS.JS BACKEND (Node.js)                │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Middleware: Clerk Auth → protectRoute             │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Controllers: Sessions, Chat                      │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Routes: /api/sessions, /api/chat                 │   │
│  └──────────────────────────────────────────────────┘   │
└─────────┬────────────────┬────────────────┬─────────────┘
          │                │                │
          ↓                ↓                ↓
    ┌──────────┐    ┌─────────────┐  ┌────────────┐
    │ MongoDB  │    │  Stream.io  │  │  Clerk     │
    │ Users    │    │  Video/Chat │  │  Auth      │
    │ Sessions │    └─────────────┘  └────────────┘
    └──────────┘            │                │
                            ↓                ↓
                     ┌─────────────┐  ┌────────────┐
                     │  WebRTC     │  │  Webhooks  │
                     │  Signaling  │  │ → Inngest  │
                     └─────────────┘  └────────────┘
```




🛠️ Tech Stack

### 🖥️ Frontend
- React 19 + Vite  
- React Router v7  
- TanStack React Query  
- Stream React Video SDK  
- Monaco Code Editor  
- Tailwind CSS + DaisyUI  

### ⚙️ Backend
- Node.js + Express  
- MongoDB + Mongoose  
- Clerk Authentication  
- Stream.io (Video + Chat)  
- Inngest (Webhook processing)  

### 🌐 External Services
- Piston API – Code execution  
- Render – Application deployment  
- MongoDB Atlas – Database hosting  


## 📊 API Endpoints

### Sessions
- `POST /api/sessions` – Create new session  
- `GET /api/sessions/active` – List active sessions  
- `GET /api/sessions/my-recent` – Get user's past sessions  
- `GET /api/sessions/:id` – Get session by ID  
- `POST /api/sessions/:id/join` – Join a session  
- `POST /api/sessions/:id/end` – End session (host only)  

### Chat
- `GET /api/chat/token` – Get Stream.io auth token

  
## 🔒 Security Features

- **Authentication** – Clerk handles OAuth and session management  
- **Authorization** – Middleware validates user permissions  
- **Input Validation** – Mongoose schemas + controller-level checks  
- **Code Execution** – Fully sandboxed using Docker containers (Piston)  
- **CORS** – Restricted to specific frontend origins  
- **Environment Variables** – Secrets managed securely via `.env` 

## 🎯 Key Learnings


1. Integrated WebRTC using Stream.io instead of building from scratch  
2. Used React Query for server state and useState for UI state  
3. Synced Clerk authentication with backend using webhooks  
4. Implemented polling as a simple real-time MVP solution  
5. Designed layered error handling across frontend, backend, and DB  
6. Deployed a production-ready app with logging and health checkss 


